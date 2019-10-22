const wait = require('waait');
const db = require('../db/index');
const PubCrawlDB = require('../utils/PubCrawlDB');
const makeDataLoaders = require('../utils/DataLoader');

async function checkNextCrawlTime(nextCrawl, now, pubName, pubItemId) {
	try {
		if (nextCrawl <= now) {
			await wait(500);
			const [res] = await PubCrawlDB.getCrawlerInstructionsData(pubName, [pubItemId]);
			const crawlTime = new Date(res.next_crawl.toISOString());
			return checkNextCrawlTime(crawlTime, now, pubName, pubItemId);
		}
		await wait(200);
		return true;
	} catch (error) {
		return error;
	}
}

module.exports = {
	async recrawl(parent, args, ctx, info) {
		try {
			const {
				publisher_name, pub_item_id, video_id, publisher_id,
			} = args;

			if (!ctx.videoLoader) {
				ctx.videoLoader = makeDataLoaders(publisher_id, publisher_name);
			}

			const { affectedRows } = await PubCrawlDB.recrawl(publisher_name, pub_item_id);

			if (affectedRows !== 1) throw new Error('No rows effected');

			const now = new Date(new Date(new Date(Date.now()).toLocaleString('en-US', { timeZone: 'UTC' })).toISOString());
			const [res] = await PubCrawlDB.getCrawlerInstructionsData(publisher_name, [pub_item_id]);
			const nextCrawl = new Date(res.next_crawl.toISOString());

			await checkNextCrawlTime(nextCrawl, now, publisher_name, pub_item_id);

			const [video] = await db.query(
				'SELECT * FROM trc.videos WHERE publisher_id = ? AND id = ?',
				[publisher_id, video_id],
			);

			if (video) video.publisher = args.publisher_name;

			return video;
		} catch (error) {
			return error;
		}
	},
};
