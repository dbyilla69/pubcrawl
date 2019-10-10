const db = require('../db/index')
const { perPage } = require('../config.js')

function Cache() {
	this.videos = {}
	this.pageCounts = {}
	this.auditData = {}
	this.instructionsData = {}
	this.channelsData = {}
	this.publishers = {}
	this.parentChannels = {}
}

Cache.makeUniqueKey = function(args) {
	const formattedArgs = {
		...args,
		page: args.page || 1,
		order: args.order || 'DESC',
	}

	const uniqueKey = Object.keys(formattedArgs)
		.sort()
		.reduce((string, key) => string + `|${key}:${formattedArgs[key]}|`, '')

	return uniqueKey
}

Cache.prototype.getVideos = async function(args) {
	try {
		const key = Cache.makeUniqueKey(args)
		const foundCache = this.videos[key]
		const hasExpired = foundCache && Date.now() > foundCache.expiresAt

		if (!foundCache || hasExpired) {
			const page = args.page - 1 || 0
			const skip = page * perPage
			const order = {
				toSqlString: function() {
					return args.order || 'DESC'
				},
			}

			let sql
			const bindings = [args.publisher_id, order, perPage, skip]

			switch (args.recommendable_filter) {
				case 'RECOMMENDABLE':
					sql = `
                        SELECT trc.videos.*, trc.publishers.name as publisher 
                        FROM trc.videos 
                        INNER JOIN trc.publishers 
                        ON trc.publishers.id = trc.videos.publisher_id 
                        WHERE publisher_id = ? 
                        AND is_recommendable = true
                        AND has_expired = false
                        ORDER BY create_time ?
                        LIMIT ?
                        OFFSET ?
                    `
					break

				case 'NON_RECOMMENDABLE':
					sql = `
                        SELECT trc.videos.*, trc.publishers.name as publisher 
                        FROM trc.videos 
                        INNER JOIN trc.publishers 
                        ON trc.publishers.id = trc.videos.publisher_id 
                        WHERE publisher_id = ? 
                        AND (is_recommendable = false
                        OR has_expired = true)
                        ORDER BY create_time ?
                        LIMIT ?
                        OFFSET ?
                    `
					break

				default:
					sql = `
                        SELECT trc.videos.*, trc.publishers.name as publisher 
                        FROM trc.videos 
                        INNER JOIN trc.publishers 
                        ON trc.publishers.id = trc.videos.publisher_id 
                        WHERE publisher_id = ? 
                        ORDER BY create_time ?
                        LIMIT ?
                        OFFSET ?
                    `
			}

			const videos = await db.query(sql, bindings)

			if (videos.fatal) throw new Error('DB response failed')

			this.videos[key] = {
				videos,
				expiresAt: Date.now() + 60000,
			}
		}

		return this.videos[key].videos
	} catch (error) {
		throw error
	}
}

Cache.prototype.getCrawlerAuditData = async function(pubName, ids) {
	try {
		const key = Cache.makeUniqueKey({ ...ids })
		const foundCache = this.auditData[key]
		const hasExpired = foundCache && Date.now() > foundCache.expiresAt

		const connectionTimedOut =
			foundCache &&
			foundCache.auditData.some(audit =>
				Object.values(audit).some(val => val === 'db connection timed out')
			)

		if (!foundCache || hasExpired || connectionTimedOut) {
			const placeholders = ids.map(id => '?').join()
			const auditData = await db.query(
				`
                    SELECT * FROM crawler.audit 
                    WHERE publisher = ?
                    AND pub_item_id IN (${placeholders})
                `,
				[pubName, ...ids]
			)

			if (auditData.fatal) throw new Error('DB response failed')

			this.auditData[key] = {
				auditData,
				expiresAt: Date.now() + 60000,
			}
		}

		return this.auditData[key].auditData
	} catch (error) {
		throw error
	}
}

Cache.prototype.getCrawlerInstructionsData = async function(pubName, ids) {
	try {
		const key = Cache.makeUniqueKey({ ...ids })
		const foundCache = this.instructionsData[key]
		const hasExpired = foundCache && Date.now() > foundCache.expiresAt

		const connectionTimedOut =
			foundCache &&
			foundCache.instructionsData.some(instructions =>
				Object.values(instructions).some(
					val => val === 'db connection timed out'
				)
			)

		if (!foundCache || hasExpired || connectionTimedOut) {
			const placeholders = ids.map(id => '?').join()
			const instructionsData = await db.query(
				`
                    SELECT * FROM crawler.instructions 
                    WHERE publisher = ?
                    AND pub_item_id IN (${placeholders})
                `,
				[pubName, ...ids]
			)

			if (instructionsData.fatal) throw new Error('DB response failed')

			this.instructionsData[key] = {
				instructionsData,
				expiresAt: Date.now() + 60000,
			}
		}

		return this.instructionsData[key].instructionsData
	} catch (error) {
		throw error
	}
}

Cache.prototype.getPageInfo = async function({
	publisher_id,
	recommendable_filter,
}) {
	try {
		this.pageCounts[publisher_id] = this.pageCounts[publisher_id] || {}
		const foundCache = this.pageCounts[publisher_id][recommendable_filter]
		const hasExpired = foundCache && Date.now() > foundCache.expiresAt

		if (!foundCache || hasExpired) {
			let res

			switch (recommendable_filter) {
				case 'RECOMMENDABLE':
					res = await db.query(
						`SELECT COUNT(id) FROM trc.videos WHERE publisher_id = ? AND is_recommendable = true AND has_expired = false`,
						[publisher_id]
					)
					break
				case 'NON_RECOMMENDABLE':
					res = await db.query(
						`SELECT COUNT(id) FROM trc.videos WHERE publisher_id = ? AND (is_recommendable = false OR has_expired = true)`,
						[publisher_id]
					)
					break
				default:
					res = await db.query(
						`SELECT COUNT(id) FROM trc.videos WHERE publisher_id = ?`,
						[publisher_id]
					)
			}
			const [count] = res
			const videoCount = count['COUNT(id)']
			const totalPages = Math.ceil(videoCount / perPage)

			this.pageCounts[publisher_id][recommendable_filter] = {
				totalPages,
				expiresAt: Date.now() + 20 * 60 * 1000,
			}
		}

		return this.pageCounts[publisher_id][recommendable_filter].totalPages
	} catch (error) {
		throw error
	}
}

Cache.prototype.getChannelsData = async function(pubId, ids) {
	try {
		const key = Cache.makeUniqueKey({ ...ids })
		const foundCache = this.channelsData[key]
		const hasExpired = foundCache && Date.now() > foundCache.expiresAt

		const connectionTimedOut =
			foundCache &&
			foundCache.channels.some(channel =>
				Object.values(channel).some(val => val === 'db connection timed out')
			)

		if (!foundCache || hasExpired || connectionTimedOut) {
			const placeholders = ids.map(id => '?').join()
			const channels = await db.query(
				`
                    SELECT channel.*, parent.channel as parent_channel, parent.id as parent_channel_id, trc.video_channels.* 
                    FROM trc.video_channels
                    INNER JOIN trc.publisher_channels as channel 
                    ON trc.video_channels.channel_id = channel.id
                    INNER JOIN trc.publisher_channels as parent
                    ON channel.parent_channel = parent.id
                    WHERE channel.publisher_id = ?
                    AND trc.video_channels.video_id IN (${placeholders})
                `,
				[pubId, ...ids]
			)

			if (channels.fatal) throw new Error('DB response failed')

			this.channelsData[key] = {
				channels,
				expiresAt: Date.now() + 60000,
			}
		}

		return this.channelsData[key].channels
	} catch (error) {
		throw error
	}
}

module.exports = new Cache()
