import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { CURRENT_PUBLISHER_QUERY } from '../pages/publishers/[id]/index.js'

function createClient({ headers }) {
	return new ApolloClient({
		uri: 'http://localhost:4000',
		clientState: {
			resolvers: {
				Mutation: {
					setPublisher: (parent, args, ctx, info) => {
						const publisher = {
							__typename: 'Publisher',
							id: args.id,
							name: args.publisher_name,
							description: args.description,
						}

						ctx.client.writeQuery({
							query: CURRENT_PUBLISHER_QUERY,
							data: { publisherWhereId: publisher },
						})
						
						return publisher
					},
				},
				Query: {
					publisherWhereId: (parent, args, ctx, info) => {
						const data = ctx.client.readQuery({ query: CURRENT_PUBLISHER_QUERY })
						console.log(data)
						return data
					},
				},
			},
		},
	})
}

export default withApollo(createClient)
