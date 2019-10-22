const db = require('../db/index');
const makeDataLoaders = require('../utils/DataLoader');
const PubCrawlDB = require('../utils/PubCrawlDB');

module.exports = {
	allPublishers: async (parent, args, ctx, info) => {
		try {
			if (args.id) {
				const res = await ctx.db.query('SELECT * FROM trc.publishers WHERE id = ?', [
					args.id,
				]);
				return res;
			}

			if (args.name) {
				const res = await ctx.db.query(
					'SELECT * from trc.publishers WHERE name RLIKE ? LIMIT 100',
					[args.name],
				);
				return res;
			}

			if (args.description) {
				const res = await ctx.db.query(
					'SELECT * from trc.publishers WHERE LOWER(description) RLIKE ? LIMIT 100',
					[args.description.toLowerCase()],
				);
				return res;
			}

			return await ctx.db.query(
				'SELECT * FROM trc.publishers ORDER BY id DESC LIMIT 100',
			);
		} catch (error) {
			return error;
		}
	},

	publisherWhereId: async (parent, args, ctx, info) => {
		try {
			const [publisher] = await ctx.db.query(
				'SELECT id, name, description FROM trc.publishers WHERE id = ?',
				[args.id],
			);

			return publisher;
		} catch (error) {
			return error;
		}
	},

	publisherConfig: async (parent, args, ctx, info) => {
		try {
			const config = await ctx.db.query(
				'SELECT * FROM trc.publisher_config WHERE publisher_id = ?',
				[args.id],
			);

			return config;
		} catch (error) {
			return error;
		}
	},

	allVideos: async (parent, args, ctx, info) => {
		try {
			if (!ctx.videoLoader) {
				ctx.videoLoader = makeDataLoaders(args.publisher_id, args.publisher_name);
			}

			const res = await PubCrawlDB.getVideos(args);

			res.forEach((video) => (video.publisher = args.publisher_name));

			const totalPages = await PubCrawlDB.getPageInfo(args);
			const currentPage = args.page || 1;
			return {
				pageInfo: {
					totalPages,
					hasNextPage: currentPage < totalPages,
				},
				edges: res,
			};
		} catch (error) {
			return error;
		}
	},

	videoWhereId: async (parent, args, ctx, info) => {
		try {
			if (!ctx.videoLoader) {
				ctx.videoLoader = makeDataLoaders(args.publisher_id, args.publisher_name);
			}

			const [video] = await db.query(
				'SELECT * FROM trc.videos WHERE publisher_id = ? AND id = ?',
				[args.publisher_id, args.video_id],
			);

			if (video) {
				video.publisher = args.publisher_name;
			}

			return video;
		} catch (error) {
			return error;
		}
	},

	videosWhereUrl: async (parent, args, ctx, info) => {
		try {
			if (!ctx.videoLoader) {
				ctx.videoLoader = makeDataLoaders(args.publisher_id, args.publisher_name);
			}

			const videos = await db.query(
				'SELECT * FROM trc.videos WHERE publisher_id = ? AND url LIKE ? ORDER BY create_time DESC',
				[args.publisher_id, args.video_url],
			);

			videos.forEach((video) => (video.publisher = args.publisher_name));
			return videos;
		} catch (error) {
			return error;
		}
	},
};
