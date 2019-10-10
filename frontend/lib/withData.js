import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.BACKEND_URL,
	})
}

export default withApollo(createClient)
