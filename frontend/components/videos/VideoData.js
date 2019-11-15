import ChannelsData from './ChannelsData';
import MetaData from './MetaData';

export default ({ Cell, video }) => {
	const sortedKeys = Object.keys(video).sort((a, b) => {
		if (a === 'channelsData' || a === 'metaData') {
			return 1;
		}
		if (b === 'channelsData' || b === 'metaData') {
			return -1;
		}

		return a < b;
	});

	return sortedKeys.map((property) => {
		if (property === 'recrawlData') return null;

		if (property === 'metaData') {
			return (
				<MetaData
					metaData={video.metaData}
					Cell={Cell}
					key={`${video[property]}-${property}`}
				/>
			);
		}

		if (
			['crawlerAuditData', 'crawlerInstructionsData'].includes(property)
		) {
			return Object.keys(video[property]).map((nestedProp) => (
				<Cell
					key={`${nestedProp}-${video[property][nestedProp]}`}
					displayKey={nestedProp}
					value={video[property][nestedProp]}
				/>
			));
		}

		if (property === 'channelsData') {
			return (
				<ChannelsData
					channelsData={video.channelsData}
					Cell={Cell}
					key={`${video[property]}-${property}`}
				/>
			);
		}

		return (
			<Cell
				key={`${property}-${video[property]}`}
				displayKey={property}
				value={video[property]}
			/>
		);
	});
};
