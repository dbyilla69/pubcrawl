const { gql } = require('apollo-server');

module.exports = gql`
	type Query {
		allPublishers(id: ID, name: String, description: String): [Publisher]!
		allNetworks(id: ID, name: String, description: String): [Publisher]!
		publisherWhereId(id: ID): Publisher
		publisherConfig(id: ID): [PublisherConfig]!
		allVideos(
			publisher_id: Int!
			publisher_name: String!
			page: Int
			order: OrderType
			recommendable_filter: RecommendableFilter
		): AllVideosType
		videoWhereId(
			video_id: ID!
			publisher_id: Int!
			publisher_name: String!
		): Video
		videosWhereUrl(
			video_url: String!
			publisher_id: Int!
			publisher_name: String!
		): [Video]
	}

	type Mutation {
		recrawl(publisher_name: String!, pub_item_id: String!, video_id: ID!, publisher_id: Int!): Video!
	}

	scalar DateTime

	type Video {
		publisher: String
		id: ID!
		publisher_id: ID!
		pub_video_id: String
		uploader: String
		title: String
		description: String
		url: String
		thumbnail_url: String
		publish_date: DateTime
		is_recommendable: Boolean
		is_manual_recommendable: Boolean
		external_data: String
		item_type: String
		has_expired: Boolean
		was_crawled: Boolean
		update_time: DateTime
		start_date: DateTime
		create_time: DateTime
		crawlerAuditData: CrawlerAuditData
		crawlerInstructionsData: CrawlerInstructionsData
		channelsData: [Channel]
		metaData: [Metadatum]
	}

	type Channel {
		id: ID
		publisher_id: Int
		parent_channel: String
		parent_channel_id: ID
		channel: String
		display_ads_prob: String
		is_reports_visible: Boolean
	}

	type Metadatum {
		id: ID!
		name: String
		value: String
	}

	type CrawlerAuditData {
		id: ID!
		publisher: String
		pub_item_id: String
		item_type: String
		first_successful_processing: DateTime
		last_successful_processing: DateTime
		last_upload: DateTime
		error_message: String
		nonrecommendable_reason: String
		source: String
		last_crawl_reason: String
		first_nonrecommendable_time: DateTime
	}

	type CrawlerInstructionsData {
		id: ID!
		lock_id: String
		lock_time: DateTime
		num_strikes: Int
		last_strike_date: DateTime
		next_crawl: DateTime
		next_crawl_reason: Int
	}

	type PublisherConfig {
		id: ID!
		publisher_id: ID!
		attribute: String
		value: String
		performer: String
		update_time: DateTime
	}

	type Publisher @cacheControl(maxAge: 3600) {
		id: ID!
		name: String
		description: String
	}

	type PageInfo @cacheControl(maxAge: 600) {
		hasNextPage: Boolean!
		totalPages: Int!
	}

	type AllVideosType {
		pageInfo: PageInfo!
		edges: [Video]!
	}

	enum OrderType {
		DESC
		ASC
	}

	enum RecommendableFilter {
		RECOMMENDABLE
		NON_RECOMMENDABLE
		BOTH
	}
`;
