import styled from 'styled-components'
import { useState } from 'react'
import { nestedProperties } from '../lib/videoFilters'

export default ({
	filters,
	setFilters,
	setRecommendableFilter,
	recommendableFilter,
}) => {
	const [videosActive, setVideosActive] = useState(false)
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

	const handleRecChange = e => setRecommendableFilter(e.target.value)
	return (
		<Container>
			<h1>Filters</h1>
			<Form>
				<h2>Recommendable?</h2>
				<fieldset>
					<label htmlFor="BOTH">
						Both{' '}
						<input
							type="radio"
							onChange={handleRecChange}
							name="recommendable"
							id="BOTH"
							value="BOTH"
							checked={Boolean(recommendableFilter === 'BOTH')}
						/>
					</label>
					<label htmlFor="NON_RECOMMENDABLE">
						Non Recommendable{' '}
						<input
							type="radio"
							onChange={handleRecChange}
							name="recommendable"
							id="NON_RECOMMENDABLE"
							value="NON_RECOMMENDABLE"
							checked={Boolean(recommendableFilter === 'NON_RECOMMENDABLE')}
						/>
					</label>
					<label htmlFor="RECOMMENDABLE">
						Recommendable{' '}
						<input
							type="radio"
							onChange={handleRecChange}
							name="recommendable"
							id="RECOMMENDABLE"
							value="RECOMMENDABLE"
							checked={Boolean(recommendableFilter === 'RECOMMENDABLE')}
						/>
					</label>
				</fieldset>
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
					channels
				</FilterHeader>
				<FieldSetStyles className={channelsActive && 'active'}>
					{channelsActive && channelsCheckBoxes}
				</FieldSetStyles>
			</Form>
		</Container>
		
	)
}

const createCheckBox = (filter, filters, onChange) => (
	<label key={filter} htmlFor={filter}>
		{filter}{' '}
		<input
			type="checkbox"
			checked={filters[filter]}
			name={filter}
			id={filter}
			onChange={e => onChange({ ...filters, [filter]: !filters[filter] })}
		/>
	</label>
)

const Container = styled.div`
	border-left: 3px solid ${props => props.theme.blue};
	padding-left: 20px;
	text-align: right;
	h1 {
		margin-bottom: 0;
		color: ${props => props.theme.blue}
	}
`
const Form = styled.form`
	position: sticky;
	top: -173px;
	
	fieldset {
		display: grid;
		grid-template-columns: 1fr;
	}
`

const FilterHeader = styled.h2`
	text-align: right;
	margin: 5px 0;
	&:hover {
		cursor: pointer;
	}
`

const FieldSetStyles = styled.fieldset`
	opacity: 0;
	max-height: 0vh;
	overflow: hidden;
	transition: max-height 0.5s linear;

	&.active {
		opacity: 1;
		max-height: 100vh;
	}
`
