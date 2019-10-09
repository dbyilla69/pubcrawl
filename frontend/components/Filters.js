import styled from 'styled-components'
import { useState } from 'react'
import Link from 'next/link'

export default ({
	filters,
	setFilters,
	setRecommendableFilter,
	recommendableFilter,
}) => {
	const [recommendableActive, setRecommendableActive] = useState(true)
	const [videosActive, setVideosActive] = useState(false)
	const [auditActive, setAuditActive] = useState(false)
	const [instructionsActive, setInstructionsActive] = useState(false)
	const [channelsActive, setChannelsActive] = useState(false)

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

	const handleRecChange = e => setRecommendableFilter(e.target.value)
	return (
		<Container>
			<StickyContainer>
				<h4>
					<Link href="/">
						<a>Back to Search</a>
					</Link>
				</h4>
				<h1>Filters</h1>
				<Form>
					<FilterHeader
						tabIndex={0}
						onClick={e => setRecommendableActive(!recommendableActive)}
						onKeyPress={e => e.which === 13 && setRecommendableActive(!recommendableActive)}
					>
						Recommendable?
					</FilterHeader>
					<FieldSetStyles className={recommendableActive && 'active'}>
						{recommendableActive && (
							<>
								<label htmlFor="BOTH">
									<input
										type="radio"
										onChange={handleRecChange}
										name="recommendable"
										id="BOTH"
										value="BOTH"
										checked={Boolean(recommendableFilter === 'BOTH')}
									/>{' '}
									Both
								</label>
								<label htmlFor="NON_RECOMMENDABLE">
									<input
										type="radio"
										onChange={handleRecChange}
										name="recommendable"
										id="NON_RECOMMENDABLE"
										value="NON_RECOMMENDABLE"
										checked={Boolean(recommendableFilter === 'NON_RECOMMENDABLE')}
									/>{' '}
									Non Recommendable
								</label>
								<label htmlFor="RECOMMENDABLE">
									<input
										type="radio"
										onChange={handleRecChange}
										name="recommendable"
										id="RECOMMENDABLE"
										value="RECOMMENDABLE"
										checked={Boolean(recommendableFilter === 'RECOMMENDABLE')}
									/>{' '}
									Recommendable
								</label>
							</>
						)}
					</FieldSetStyles>
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
			</StickyContainer>
		</Container>
	)
}

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

const StickyContainer = styled.div`
	position: sticky;
	top: 0;
`

const Container = styled.div`
	border-right: 3px solid ${props => props.theme.blue};
	padding-right: 20px;
	h1 {
		margin-bottom: 0;
		color: ${props => props.theme.blue};
	}
`
const Form = styled.form`
	fieldset {
		display: grid;
		grid-template-columns: 1fr;
	}
`

const FilterHeader = styled.h2`
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
