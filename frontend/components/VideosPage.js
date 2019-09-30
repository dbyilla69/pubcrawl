import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Videos from './Videos'
import Filters from './Filters'
import Error from './Error'
import { defaultFilters, applyFilters } from '../lib/videoFilters'

export default props => {
	const [filters, setFilters] = useState(defaultFilters)
	const [recommendableFilter, setRecommendableFilter] = useState('BOTH')

	const { id, name } = props.publisher
	const { data, error, loading } = useQuery(ALL_VIDEOS_QUERY, {
		variables: {
			publisher_id: parseInt(id, 10),
			publisher_name: name,
			recommendable_filter: recommendableFilter,
		},
	})

	const statusSwitch = () => {
		switch (true) {
			case loading:
				return <div>loading videos...</div>
			case error:
				return <Error error={error} />
			default:
				const mappedVideoData = data.allVideos.edges.map(video =>
					applyFilters({ video, filters })
				)
				return <Videos videos={mappedVideoData} />
		}
	}

	return (
		<Layout>
			<Filters
				filters={filters}
				setFilters={setFilters}
				setRecommendableFilter={setRecommendableFilter}
				recommendableFilter={recommendableFilter}
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

export const ALL_VIDEOS_QUERY = gql`
	query ALL_VIDEOS_QUERY(
		$publisher_id: Int!
		$publisher_name: String!
		$recommendable_filter: RecommendableFilter
	) {
		allVideos(
			publisher_id: $publisher_id
			publisher_name: $publisher_name
			recommendable_filter: $recommendable_filter
		) {
			pageInfo {
				totalPages
				hasNextPage
			}
			edges {
				id
				title
				url
				thumbnail_url
				pub_video_id
				uploader
				description
				publish_date
				is_recommendable
				is_manual_recommendable
				external_data
				item_type
				has_expired
				was_crawled
				update_time
				start_date
				create_time
				crawlerAuditData {
					id
					publisher
					pub_item_id
					item_type
					first_successful_processing
					last_successful_processing
					last_upload
					error_message
					nonrecommendable_reason
					source
					last_crawl_reason
					first_nonrecommendable_time
				}
				crawlerInstructionsData {
					id
					lock_id
					lock_time
					num_strikes
					last_strike_date
					next_crawl
					next_crawl_reason
				}
				channelsData {
					id
					publisher_id
					channel
					display_ads_prob
					is_reports_visible
				}
			}
		}
	}
`
