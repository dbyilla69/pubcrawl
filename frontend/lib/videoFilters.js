export const applyFilters = ({ video, filters }) => {
	// iterate over each filter
	return Object.entries(filters).reduce((videoData, [property, active]) => {
		// if it's a property with nested fields, iterate over the nested fields
		if (nestedProperties.includes(property)) {
			Object.entries(filters[property]).forEach(([nestedProp, nestedActive]) => {
				// add those properties to the filtered videoData object
				videoData[property] = videoData[property] || {}
				if (nestedActive) videoData[property][nestedProp] = video[property][nestedProp]
			})
			return videoData
		}

		// if it's not nested, just add the top level prop
		if (active) videoData[property] = video[property]
		return videoData
	}, {})
}

export const nestedProperties = [
	'crawlerAuditData',
	'crawlerInstructionsData',
	'channelsData',
]

export const defaultFilters = {
	id: true,
	pub_video_id: false,
	uploader: false,
	title: true,
	description: true,
	url: true,
	thumbnail_url: true,
	publish_date: true,
	is_recommendable: true,
	is_manual_recommendable: false,
	external_data: false,
	item_type: false,
	has_expired: false,
	was_crawled: false,
	update_time: false,
	start_date: false,
	create_time: false,
	crawlerAuditData: {
		id: false,
		publisher: false,
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
		publisher_id: false,
		parent_channel: false,
		channel: false,
		display_ads_prob: false,
		is_reports_visible: false,
	},
}
