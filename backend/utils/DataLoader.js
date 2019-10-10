const DataLoader = require('dataloader')
const PubCrawlDB = require('./PubCrawlDB')

const makeDataLoaders = (pubId, pubName) => {
	return {
		audit: new DataLoader(async ids => {
			try {
				const res = await PubCrawlDB.getCrawlerAuditData(pubName, ids)

				return ids.map(id => res.find(auditData => auditData.pub_item_id === id))
			} catch (error) {
				return error
			}
		}),
		instructions: new DataLoader(async ids => {
			try {
				const res = await PubCrawlDB.getCrawlerInstructionsData(pubName, ids)

				return ids.map(id =>
					res.find(instructionsData => instructionsData.pub_item_id === id)
				)
			} catch (error) {
				return error
			}
		}),
		channels: new DataLoader(async ids => {
			try {
				const res = await PubCrawlDB.getChannelsData(pubId, ids)

				return ids.map(id => res.filter(channelData => channelData.video_id === id))
			} catch (error) {
				return error
			}
		}),
	}
}

module.exports = makeDataLoaders
