import styled from 'styled-components';

export default ({ channelsData, Cell }) => {
	// a check to see if there are any channels with active filters
	const numChannels = Object.keys(channelsData[0] || {}).length;

	// if not, return nothing
	if (numChannels === 0) return null;

	const channelContainer = channelsData.map((channel, channelIdx) => {
		const channelIsEven = channelIdx % 2 === 0;
		const channelCells = Object.keys(channel).map((key) => (
			<Cell
				displayKey={key}
				key={`${key}-${channel[key]}`}
				value={channel[key]}
			/>
		));

		if (!channelCells.length) return;

		return (
			<ChannelContainer
				key={Math.floor(Math.random() * 100000)}
				className={channelIsEven ? 'even' : 'odd'}
			>
				{channelCells}
			</ChannelContainer>
		);
	});

	return (
		<div key={Math.floor(Math.random() * 100000)}>
			<h3>Channel Data</h3>
			{channelContainer}
		</div>
	);
};

const ChannelContainer = styled.div`
	&.even {
		background-color: ${(props) => props.theme.lightgrey};

		div.cell.even,
		div.cell.odd {
			background-color: transparent;
		}
	}

	&.odd {
		background-color: white;

		div.cell.even,
		div.cell.odd {
			background-color: transparent;
		}
	}
`;
