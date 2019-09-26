const DataLoader = require('dataloader')
const NullFields = require('./nullFields')
const Cache = require('./Cache')

const makeDataLoaders = (pubId, pubName) => {
    return {
        audit: new DataLoader(async ids => {
            try {
                const res = await Cache.getCrawlerAuditData(pubName, ids)
                if (!res.find) return ids.map(_ => NullFields.audit)
                
                
                return ids.map(id => res.find(auditData => auditData.pub_item_id === id))
            } catch (error) {
                return error
            }
        }),
        instructions: new DataLoader(async ids => {
            try {
                const res = await Cache.getCrawlerInstructionsData(pubName, ids)
                if (!res.find) return ids.map(_ => NullFields.audit)

                return ids.map(id => res.find(instructionsData => instructionsData.pub_item_id === id))
            } catch (error) {
                return error
            }
        }),
        channels: new DataLoader(async ids => {
            try {
                const res = await Cache.getChannelsData(pubId, ids)
                if (!res.find) return ids.map(_ => NullFields.channels)

                return ids.map(
                    id => res.filter(
                        channelData => channelData.video_id === id
                    )
                )
            } catch (error) {
                return error
            }
        })
    }
}

module.exports = makeDataLoaders