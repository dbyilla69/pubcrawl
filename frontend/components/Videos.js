import styled from 'styled-components'
import { nestedProperties } from '../lib/videoFilters'

export default props => {
	const makeCell = ({ key, value, isEven }) => {
		return (
			<div
				className={isEven ? 'cell even' : 'cell odd'}
				key={`${key}:${value}${Math.floor(Math.random() * 100)}`}
			>
				<span className="key">{key}:</span>
				<span>{value ? value.toString() : '(null)'}</span>
			</div>
		)
	}

	const mappedVids = props.videos.map((video, idx) => {
		const isEven = idx % 2 === 0
		return (
			<VideoResult
				key={Math.floor(Math.random() * 1000000)}
				className={isEven ? 'even' : 'odd'}
			>
				{Object.keys(video).map((property, idx) => {
					const isEven = idx % 2 === 0

					if (property === 'channelsData') {
						const channelContainer = video.channelsData.map((channel, channelIdx) => {
							const channelIsEven = channelIdx % 2 === 0
							const channelCells = Object.keys(channel).map(channelProperty => {
								return makeCell({
									key: channelProperty,
									value: channel[channelProperty],
									isEven: true,
								})
							})
							if (!channelCells.length) return

							return (
								<ChannelContainer
									key={Math.floor(Math.random() * 10000)}
									className={channelIsEven ? 'even' : 'odd'}
								>
									{channelCells}
								</ChannelContainer>
							)
						})

						// a check to see if there are any channels with active filters
						const shouldShowChannelsData = !!Object.keys(video.channelsData[0] || {}).length

						return (
							<div key={Math.floor(Math.random() * 10000)}>
								{shouldShowChannelsData && <h3>Channel Data</h3>}
								{channelContainer}
							</div>
						)
					}

					if (nestedProperties.includes(property)) {
						return Object.keys(video[property]).map(nestedProp =>
							makeCell({ key: nestedProp, value: video[property][nestedProp], isEven })
						)
					}

					return makeCell({ key: property, value: video[property], isEven })
				})}
			</VideoResult>
		)
	})

	return <div>{mappedVids}</div>
}

const VideoResult = styled.div`
	margin: 50px 0;
	padding-bottom: 50px;

	&.even {
		border-bottom: 4px solid ${props => props.theme.grey};
	}

	&.odd {
		border-bottom: 4px solid ${props => props.theme.blue};
	}

	div.cell {
		display: grid;
		grid-template-columns: 250px auto;
		justify-content: start;

		&.even {
			background-color: ${props => props.theme.lightgrey};
		}
	}
	span.key {
		font-weight: bold;
	}

	h3 {
		margin: 5px 0 0;
		color: ${props => props.theme.blue};
	}
`

const ChannelContainer = styled.div`
	div.cell.even,
	div.cell.odd {
		background-color: transparent;
	}
	&.even {
		background-color: ${props => props.theme.lightgrey};
	}
	&.odd {
		background-color: white;
	}
`
