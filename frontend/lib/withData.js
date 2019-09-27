import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

function createClient({ headers }) {
	return new ApolloClient({
		uri: 'http://localhost:4000',
		// request: operation => {
		// 	operation.setContext({
		// 		fetchOptions: {
		// 			credentials: 'include',
		// 		},
		// 		headers,
		// 	})
		// },
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

						ctx.cache.writeQuery({
							query: CURRENT_PUBLISHER_QUERY,
							data: { currentPublisher: publisher },
						})
						return publisher
					},
				},
				Query: {
					publisher: (parent, args, ctx, info) => {
						const data = ctx.cache.readQuery({ query: CURRENT_PUBLISHER_QUERY })

						return data
					},
				},
			},
		},
	})
}

export default withApollo(createClient)
