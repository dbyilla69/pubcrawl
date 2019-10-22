/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

const RECRAWL_MUTATION = gql`
	mutation ($publisher_name: String!, $pub_item_id: String!, $publisher_id: Int!, $video_id: ID!) {
		recrawl(publisher_name: $publisher_name, pub_item_id: $pub_item_id, publisher_id: $publisher_id, video_id: $video_id) {
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
			metaData {
        name
        value
      }
		}
	}
`;

export default RECRAWL_MUTATION;
