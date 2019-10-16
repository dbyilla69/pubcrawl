module.exports = {
	async crawlerAuditData(parent, args, ctx, info) {
		return Promise.resolve(ctx.videoLoader.audit.load(parent.pub_video_id));
	},

	async crawlerInstructionsData(parent, args, ctx, info) {
		return Promise.resolve(ctx.videoLoader.instructions.load(parent.pub_video_id));
	},

	async channelsData(parent, args, ctx, info) {
		return Promise.resolve(ctx.videoLoader.channels.load(parent.id));
	},
};
