import styled from 'styled-components';
import { nestedProperties } from '../lib/videoFilters';

const makeCell = (function() {
	let counter = 0;
	return ({ key, value }) => {
		counter += 1;
		const isEven = counter % 2 === 0;

		return (
			<div
				className={isEven ? `cell even` : `cell odd`}
				key={`${key}:${value}${Math.floor(Math.random() * 100)}`}
			>
				<span className="key">{key}:</span>
				<span>{value ? value.toString() : '(null)'}</span>
			</div>
		);
	};
})();

export default (props) => {
	const mappedVids = props.videos.map((video, idx) => {
		const isEven = idx % 2 === 0;
		return (
			<VideoResult
				key={Math.floor(Math.random() * 1000000)}
				className={isEven ? 'even' : 'odd'}
			>
				{Object.keys(video).map((property) => {
					if (property === 'channelsData') {
						// a check to see if there are any channels with active filters
						const numChannels = Object.keys(video.channelsData[0] || {}).length;

						// if not, return nothing
						if (numChannels === 0) return null;

						const channelContainer = video.channelsData.map((channel, channelIdx) => {
							const channelIsEven = channelIdx % 2 === 0;
							const channelCells = Object.keys(channel).map((key) => {
								return makeCell({
									key,
									value: channel[key],
								});
							});

							if (!channelCells.length) return;

							return (
								<ChannelContainer
									key={Math.floor(Math.random() * 10000)}
									className={channelIsEven ? 'even' : 'odd'}
								>
									{channelCells}
								</ChannelContainer>
							);
						});

						return (
							<div key={Math.floor(Math.random() * 10000)}>
								<h3>Channel Data</h3>
								{channelContainer}
							</div>
						);
					}

					if (nestedProperties.includes(property)) {
						return Object.keys(video[property]).map((nestedProp) => {
							return makeCell({
								key: nestedProp,
								value: video[property][nestedProp],
							});
						});
					}

					return makeCell({
						key: property,
						value: video[property],
					});
				})}
			</VideoResult>
		);
	});

	return <div>{mappedVids}</div>;
};

const VideoResult = styled.div`
	margin: 50px 0;
	padding-bottom: 50px;

	&.even {
		border-bottom: 4px solid ${(props) => props.theme.grey};
	}

	&.odd {
		border-bottom: 4px solid ${(props) => props.theme.blue};
	}

	div.cell {
		display: grid;
		grid-template-columns: 250px auto;
		justify-content: start;
		word-break: break-word;

		&.even {
			background-color: ${(props) => props.theme.lightgrey};
		}
	}
	span.key {
		font-weight: bold;
		padding-left: 5px;
	}

	h3 {
		margin: 10px 0 0;
		color: ${(props) => props.theme.blue};
	}
`;

const ChannelContainer = styled.div`
	div.cell.even,
	div.cell.odd {
		background-color: transparent;
	}
	&.even {
		background-color: ${(props) => props.theme.lightgrey};
	}
	&.odd {
		background-color: white;
	}
`;
