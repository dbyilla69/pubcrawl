const PubCrawlDB = require('../utils/PubCrawlDB');

module.exports = {
	async recrawl(parent, args, ctx, info) {
		try {
			const { publisher_name, pub_item_id } = args;
			const { affectedRows } = await PubCrawlDB.recrawl(publisher_name, pub_item_id);

			if (affectedRows !== 1) throw new Error('No rows effected');

			return {
				pub_item_id,
				message: 'Successfully scheduled for recrawl',
			};
		} catch (error) {
			return error;
		}
	},
};
