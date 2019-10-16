import gql from 'graphql-tag';

export const ALL_VIDEOS_QUERY = gql`
	query ALL_VIDEOS_QUERY(
		$publisher_id: Int!
		$publisher_name: String!
		$recommendable_filter: RecommendableFilter
		$page: Int
	) {
		allVideos(
			publisher_id: $publisher_id
			publisher_name: $publisher_name
			recommendable_filter: $recommendable_filter
			page: $page
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
					parent_channel
					parent_channel_id
					is_reports_visible
				}
			}
		}
	}
`;

export const VIDEOS_WHERE_URL_QUERY = gql`
	query VIDEOS_WHERE_URL_QUERY(
		$publisher_id: Int!
		$publisher_name: String!
		$video_url: String!
	) {
		videosWhereUrl(
			publisher_id: $publisher_id
			publisher_name: $publisher_name
			video_url: $video_url
		) {
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
`;

export const VIDEO_WHERE_ID_QUERY = gql`
	query VIDEO_WHERE_ID_QUERY(
		$publisher_id: Int!
		$publisher_name: String!
		$video_id: String!
	) {
		videoWhereId(
			publisher_id: $publisher_id
			publisher_name: $publisher_name
			video_id: $video_id
		) {
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
`;
