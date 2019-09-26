module.exports = {
	crawlerAuditData: async (parent, args, ctx, info) => {
		return Promise.resolve(ctx.videoLoader.audit.load(parent.pub_video_id))
	},

	crawlerInstructionsData: async (parent, args, ctx, info) => {
		return Promise.resolve(ctx.videoLoader.instructions.load(parent.pub_video_id))
	},

	channelsData: async (parent, args, ctx, info) => {
		return Promise.resolve(ctx.videoLoader.channels.load(parent.id))
	},
}
