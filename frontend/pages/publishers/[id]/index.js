import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export default props => {
	const router = useRouter()
	const { id } = router.query
	const { loading, error, data } = useQuery(CURRENT_PUBLISHER_QUERY, {
		variables: { id },
	})

	if (loading) return <div>loading...</div>
	// const {loading, error, data }= useQuery(ALL_VIDEOS_QUERY, { variables: {publisher_id: }})
	return <div>hi</div>
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
			edges {
				id
				title
				url
				thumbnail_url
				publisher_id
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
