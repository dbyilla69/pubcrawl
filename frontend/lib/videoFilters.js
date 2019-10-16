/* eslint-disable no-param-reassign */
// ? 1. takes in the overall data object from which it is filtering
// ? 2. take in the level at which it is filtering (ex. 'crawlerAuditData')
// ? 3. iterates over the filters entries and creates a new object with only the desired data

const makeVideoReducer = (data) => (level) => (videoData, [property, active]) => {
	if (level) {
		if (active) {
			videoData[property] = data[level][property];
		}

		return videoData;
	}

	if (active) {
		videoData[property] = data[property];
	}

	return videoData;
};

export const applyFilters = ({ video, filters }) => {
	// extract each section of the filters
	const trcVideosFilters = { ...filters.trcVideosData };
	const crawlerAuditFilters = { ...filters.crawlerAuditData };
	const crawlerInstructionsFilters = { ...filters.crawlerInstructionsData };
	const channelsFilters = { ...filters.channelsData };

	const trcVideosData = Object.entries(trcVideosFilters).reduce(
		makeVideoReducer(video)(),
		{},
	);
	const crawlerAuditData = Object.entries(crawlerAuditFilters).reduce(
		makeVideoReducer(video)('crawlerAuditData'),
		{},
	);
	const crawlerInstructionsData = Object.entries(
		crawlerInstructionsFilters,
	).reduce(makeVideoReducer(video)('crawlerInstructionsData'), {});

	const channelsData = video.channelsData
		.map((videoChannel) => Object.entries(channelsFilters).reduce(makeVideoReducer(videoChannel)(), {}));

	const filteredVideo = {
		...trcVideosData,
		crawlerAuditData: {
			...crawlerAuditData,
		},
		crawlerInstructionsData: { ...crawlerInstructionsData },
		channelsData: [...channelsData],
	};

	return filteredVideo;
};

export const nestedProperties = ['crawlerAuditData', 'crawlerInstructionsData'];

export const defaultFilters = {
	trcVideosData: {
		id: true,
		pub_video_id: false,
		uploader: false,
		title: true,
		description: false,
		url: true,
		thumbnail_url: false,
		publish_date: false,
		is_recommendable: true,
		is_manual_recommendable: false,
		external_data: false,
		item_type: false,
		has_expired: false,
		was_crawled: false,
		update_time: false,
		start_date: false,
		create_time: false,
	},
	crawlerAuditData: {
		id: false,
		pub_item_id: false,
		item_type: false,
		first_successful_processing: false,
		last_successful_processing: false,
		last_upload: false,
		error_message: false,
		nonrecommendable_reason: false,
		source: false,
		last_crawl_reason: false,
		first_nonrecommendable_time: false,
	},
	crawlerInstructionsData: {
		id: false,
		lock_id: false,
		lock_time: false,
		num_strikes: false,
		last_strike_date: false,
		next_crawl: false,
		next_crawl_reason: false,
	},
	channelsData: {
		id: false,
		parent_channel: false,
		parent_channel_id: false,
		channel: false,
		display_ads_prob: false,
		is_reports_visible: false,
	},
};
