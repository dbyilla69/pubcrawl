import { useState } from 'react'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import PubSearch from '../components/PubSearch'
import PubList from '../components/PubList'
import Loading from '../components/Loading'
import NoResults from '../components/NoResults'

export const ALL_PUBLISHERS_QUERY = gql`
	query ALL_PUBLISHERS_QUERY($name: String, $description: String, $id: ID) {
		allPublishers(name: $name, description: $description, id: $id) {
			name
			id
			description
		}
	}
`

export default () => {
	const [searchType, setSearchType] = useState('name')
	const [loading, setLoading] = useState(false)
	const [pubs, setPubs] = useState([])
	const [initialLoad, setInitialLoad] = useState(true)

	const onChange = debounce(async (e, client) => {
		if (e.target.value.length < 3) return setPubs([])

		setLoading(true)
		initialLoad && setInitialLoad(false)
		const resp = await client.query({
			query: ALL_PUBLISHERS_QUERY,
			variables: { [searchType]: e.target.value },
		})

		setPubs(resp.data.allPublishers)
		setLoading(false)
	}, 200)

	return (
		<ApolloConsumer>
			{client => (
				<>
					<PubSearch
						onChange={onChange}
						setSearchType={setSearchType}
						searchType={searchType}
						client={client}
					/>
					{loading && <Loading />}
					{!loading && !initialLoad && !pubs.length ? <NoResults /> : null}
					{!loading && <PubList pubs={pubs} />}
				</>
			)}
		</ApolloConsumer>
	)
}
