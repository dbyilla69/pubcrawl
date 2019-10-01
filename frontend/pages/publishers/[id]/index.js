import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Error from '../../../components/Error'
import VideosPage from '../../../components/VideosPage'

export default props => {
	const { id } = props.query
	const { loading, error, data } = useQuery(CURRENT_PUBLISHER_QUERY, {
		variables: { id }
	})

	if (loading) return <div>loading publisher...</div>
	if (error) return <Error error={error} />

	return <VideosPage publisher={data.publisherWhereId} />
}

export const CURRENT_PUBLISHER_QUERY = gql`
	query publisher($id: ID!) {
		publisherWhereId(id: $id) {
			id
			name
			description
		}
	}
`
