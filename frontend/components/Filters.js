import styled from 'styled-components'
import { useState } from 'react'
import Link from 'next/link'
import VideoSearch from './VideoSearch'
import makeCheckBoxes from '../lib/makeCheckBoxes'

export default ({
	filters,
	setFilters,
	setRecommendableFilter,
	recommendableFilter,
	disabledFields,
}) => {
	const [recommendableActive, setRecommendableActive] = useState(true)
	const [videosActive, setVideosActive] = useState(false)
	const [auditActive, setAuditActive] = useState(false)
	const [instructionsActive, setInstructionsActive] = useState(false)
	const [channelsActive, setChannelsActive] = useState(false)

	const checkboxes = makeCheckBoxes({ filters, setFilters })
	const handleRecChange = e => setRecommendableFilter(e.target.value)
	return (
		<Container>
			<LinkStyles>
				<Link href="/">
					<a>Back to Pub Search</a>
				</Link>
			</LinkStyles>
			<VideoSearch />

			<h1>Filters</h1>
			<Form>
				{!disabledFields.includes('recommendable') && (
					<>
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
					</>
				)}
				<FilterHeader
					tabIndex={0}
					onClick={e => setVideosActive(!videosActive)}
					onKeyPress={e => e.which === 13 && setVideosActive(!videosActive)}
				>
					trc.videos
				</FilterHeader>
				<FieldSetStyles className={videosActive && 'active'}>
					{videosActive && checkboxes.trcVideosCheckBoxes}
				</FieldSetStyles>
				<FilterHeader
					tabIndex={0}
					onClick={e => setAuditActive(!auditActive)}
					onKeyPress={e => e.which === 13 && setAuditActive(!auditActive)}
				>
					crawler.audit
				</FilterHeader>
				<FieldSetStyles className={auditActive && 'active'}>
					{auditActive && checkboxes.crawlerAuditCheckBoxes}
				</FieldSetStyles>
				<FilterHeader
					tabIndex={0}
					onClick={e => setInstructionsActive(!instructionsActive)}
					onKeyPress={e => e.which === 13 && setInstructionsActive(!instructionsActive)}
				>
					crawler.instructions
				</FilterHeader>
				<FieldSetStyles className={instructionsActive && 'active'}>
					{instructionsActive && checkboxes.crawlerInstructionsCheckBoxes}
				</FieldSetStyles>
				<FilterHeader
					tabIndex={0}
					onClick={e => setChannelsActive(!channelsActive)}
					onKeyPress={e => e.which === 13 && setChannelsActive(!channelsActive)}
				>
					channels
				</FilterHeader>
				<FieldSetStyles className={channelsActive && 'active'}>
					{channelsActive && checkboxes.channelsCheckBoxes}
				</FieldSetStyles>
			</Form>
		</Container>
	)
}

const Container = styled.div`
	border-right: 3px solid ${props => props.theme.blue};
	padding: 0 20px 10vh 0;
	height: 100vh;
	overflow: scroll;
	position: sticky;

	top: 0;

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

const LinkStyles = styled.div`
	font-weight: 700;
`
