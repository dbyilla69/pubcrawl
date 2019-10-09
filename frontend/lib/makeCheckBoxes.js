const createCheckBox = layer => (filter, filters, onChange) => (
	<label key={filter} htmlFor={`${layer}-${filter}`}>
		<input
			type="checkbox"
			checked={filters[filter]}
			name={`${layer}-${filter}`}
			id={`${layer}-${filter}`}
			onChange={e => onChange({ ...filters, [filter]: !filters[filter] })}
		/>{' '}
		{filter}
	</label>
)

export default ({ filters, setFilters }) => {
	const trcVideosCheckBoxes = Object.keys(filters.trcVideosData).map(filter =>
		createCheckBox('trc-videos')(filter, filters.trcVideosData, trcVideosData =>
			setFilters({
				...filters,
				trcVideosData,
			})
		)
	)

	const crawlerAuditCheckBoxes = Object.keys(filters.crawlerAuditData).map(
		filter =>
			createCheckBox('crawler-audit')(
				filter,
				filters.crawlerAuditData,
				crawlerAuditData =>
					setFilters({
						...filters,
						crawlerAuditData,
					})
			)
	)

	const crawlerInstructionsCheckBoxes = Object.keys(
		filters.crawlerInstructionsData
	).map(filter =>
		createCheckBox('crawler-instructions')(
			filter,
			filters.crawlerInstructionsData,
			crawlerInstructionsData =>
				setFilters({
					...filters,
					crawlerInstructionsData,
				})
		)
	)

	const channelsCheckBoxes = Object.keys(filters.channelsData).map(filter =>
		createCheckBox('channels')(filter, filters.channelsData, channelsData =>
			setFilters({
				...filters,
				channelsData,
			})
		)
	)

	return {
		trcVideosCheckBoxes,
		crawlerAuditCheckBoxes,
		crawlerInstructionsCheckBoxes,
		channelsCheckBoxes,
	}
}
