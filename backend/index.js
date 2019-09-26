const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const db = require('./db/index')

const Query = require('./resolvers/Query')
const Video = require('./resolvers/Video')

const typeDefs = importSchema('./schema.graphql')

const resolvers = { Query, Video }

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ctx => {
		ctx.db = db
		return ctx
	},
})

server.listen().then(({ url }) => console.log(`Server listening at ${url}`))
