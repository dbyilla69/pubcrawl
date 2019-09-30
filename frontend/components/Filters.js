import styled from 'styled-components'
import { useState } from 'react'
import { nestedProperties } from '../lib/videoFilters'

export default ({ filters, setFilters }) => {
	const [videosActive, setVideosActive] = useState(true)
	const [auditActive, setAuditActive] = useState(false)
	const [instructionsActive, setInstructionsActive] = useState(false)
	const [channelsActive, setChannelsActive] = useState(false)

	const trcVideosCheckBoxes = Object.keys(filters).map(filter => {
		if (nestedProperties.includes(filter)) return

		return createCheckBox(filter, filters, setFilters)
	})

	const crawlerAuditCheckBoxes = Object.keys(filters.crawlerAuditData).map(
		filter =>
			createCheckBox(filter, filters.crawlerAuditData, auditFilters =>
				setFilters({
					...filters,
					crawlerAuditData: {
						...auditFilters,
					},
				})
			)
	)

	const crawlerInstructionsCheckBoxes = Object.keys(
		filters.crawlerInstructionsData
	).map(filter =>
		createCheckBox(filter, filters.crawlerInstructionsData, instructionsFilters =>
			setFilters({
				...filters,
				crawlerInstructionsData: {
					...instructionsFilters,
				},
			})
		)
	)

	const channelsCheckBoxes = Object.keys(filters.channelsData).map(filter =>
		createCheckBox(filter, filters.channelsData, channelsFilters =>
			setFilters({
				...filters,
				channelsData: {
					...channelsFilters,
				},
			})
		)
	)

	return (
		<Form>
			<FilterHeader
				tabIndex={0}
				onClick={e => setVideosActive(!videosActive)}
				onKeyPress={e => e.which === 13 && setVideosActive(!videosActive)}
			>
				trc.videos
			</FilterHeader>
			<FieldSetStyles className={videosActive && 'active'}>
				{videosActive && trcVideosCheckBoxes}
			</FieldSetStyles>
			<FilterHeader
				tabIndex={0}
				onClick={e => setAuditActive(!auditActive)}
				onKeyPress={e => e.which === 13 && setAuditActive(!auditActive)}
			>
				crawler.audit
			</FilterHeader>
			<FieldSetStyles className={auditActive && 'active'}>
				{auditActive && crawlerAuditCheckBoxes}
			</FieldSetStyles>
			<FilterHeader
				tabIndex={0}
				onClick={e => setInstructionsActive(!instructionsActive)}
				onKeyPress={e => e.which === 13 && setInstructionsActive(!instructionsActive)}
			>
				crawler.instructions
			</FilterHeader>
			<FieldSetStyles className={instructionsActive && 'active'}>
				{instructionsActive && crawlerInstructionsCheckBoxes}
			</FieldSetStyles>
			<FilterHeader
				tabIndex={0}
				onClick={e => setChannelsActive(!channelsActive)}
				onKeyPress={e => e.which === 13 && setChannelsActive(!channelsActive)}
			>
				trc.video_channels / trc.publisher_channels
			</FilterHeader>
			<FieldSetStyles className={channelsActive && 'active'}>
				{channelsActive && channelsCheckBoxes}
			</FieldSetStyles>
		</Form>
	)
}

const createCheckBox = (filter, filters, onChange) => (
	<label key={filter} htmlFor={filter}>
		<input
			type="checkbox"
			checked={filters[filter]}
			name={filter}
			id={filter}
			onChange={e => onChange({ ...filters, [filter]: !filters[filter] })}
		/>{' '}
		{filter}
	</label>
)

const Form = styled.form`
	fieldset {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto auto;
	}
`

const FilterHeader = styled.h2`
	&:hover {
		cursor: pointer;
	}
`

const FieldSetStyles = styled.fieldset`
	max-height: 0vh;
	overflow: hidden;
	transition: max-height 0.5s linear;

	&.active {
		max-height: 100vh;
	}
`
