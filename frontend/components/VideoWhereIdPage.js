import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import Videos from './Videos'
import Filters from './Filters'
import Error from './Error'
import Loading from './Loading'
import { defaultFilters, applyFilters } from '../lib/videoFilters'
import { VIDEO_WHERE_ID_QUERY } from '../lib/queries'

export default props => {
	const { id, name } = props.publisher
	const { search } = props
	const [filters, setFilters] = useState(defaultFilters)

	const { data, error, loading } = useQuery(VIDEO_WHERE_ID_QUERY, {
		variables: {
			publisher_id: parseInt(id, 10),
			publisher_name: name,
			video_id: search,
		},
	})

	const statusSwitch = () => {
		switch (true) {
			case loading:
				return <Loading />
			case error:
				return <Error error={error} />
			default:
				const video = applyFilters({ video: data.videoWhereId, filters })
				return <Videos videos={[video]} />
		}
	}

	return (
		<Layout>
			<Filters
				filters={filters}
				setFilters={setFilters}
				setRecommendableFilter={function() {}}
				recommendableFilter={function() {}}
				disabledFields={['recommendable']}
			/>
			{statusSwitch()}
		</Layout>
	)
}

const Layout = styled.main`
	display: grid;
	grid-template-columns: 1fr 4fr;
	grid-column-gap: 50px;
`
