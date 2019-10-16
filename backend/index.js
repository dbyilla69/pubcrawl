const { ApolloServer } = require('apollo-server');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const db = require('./db/index');

const typeDefs = require('./schema');
const Query = require('./resolvers/Query');
const Video = require('./resolvers/Video');

const resolvers = { Query, Video };

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: (ctx) => {
		ctx.db = db;
		return ctx;
	},
	plugins: [responseCachePlugin()],
});

server.listen(8888).then(({ url }) => console.log(`Server listening at ${url}`));
