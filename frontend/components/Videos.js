import styled from 'styled-components';
import { nestedProperties } from '../lib/videoFilters';
import makeCellComponent from './VideoDataCellHOC';

export default (props) => {
	const mappedVids = props.videos.map((video, idx) => {
		const isEven = idx % 2 === 0;
		const Cell = makeCellComponent();
		return (
			<VideoResult
				key={Math.floor(Math.random() * 1000000)}
				className={isEven ? 'even' : 'odd'}
			>
				{Object.keys(video).map((property) => {
					if (property === 'channelsData') {
						// a check to see if there are any channels with active filters
						const numChannels = Object.keys(
							video.channelsData[0] || {},
						).length;

						// if not, return nothing
						if (numChannels === 0) return null;

						const channelContainer = video.channelsData.map(
							(channel, channelIdx) => {
								const channelIsEven = channelIdx % 2 === 0;
								const channelCells = Object.keys(channel).map(
									(key) => (<Cell displayKey={key} key={`${key}-${channel[key]}`} value={channel[key]} />),
								);

								if (!channelCells.length) return;

								return (
									<ChannelContainer
										key={Math.floor(Math.random() * 100000)}
										className={
											channelIsEven ? 'even' : 'odd'
										}
									>
										{channelCells}
									</ChannelContainer>
								);
							},
						);

						return (
							<div key={Math.floor(Math.random() * 100000)}>
								<h3>Channel Data</h3>
								{channelContainer}
							</div>
						);
					}

					if (property === 'metaData') {
						if (!video.metaData || video.metaData.length === 0) return;

						const metaDataCells = video.metaData.map(
							(metaDatum) => {
								const { name, value } = metaDatum;
								return <Cell displayKey={name} value={value} key={`${name}-${value}`} />;
							},
						);

						return (
							<div key={Math.floor(Math.random() * 100000)}>
								<h3>MetaData</h3>
								{metaDataCells}
							</div>
						);
					}

					if (nestedProperties.includes(property)) {
						return Object.keys(video[property])
							.map((nestedProp) => (
								<Cell key={`${nestedProp}-${video[property][nestedProp]}`} displayKey={nestedProp} value={video[property][nestedProp]} />
							));
					}

					return <Cell key={`${property}-${video[property]}`} displayKey={property} value={video[property]} />;
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
		margin: 20px 0 0;
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
