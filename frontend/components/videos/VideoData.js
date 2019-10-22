import ChannelsData from './ChannelsData';
import MetaData from './MetaData';

export default ({ Cell, video }) => {
	const sortedKeys = Object.keys(video).sort((a, b) => {
		if (a === 'channelsData' || a === 'metaData') {
			return 1;
		}
		return -1;
	});

	return sortedKeys.map((property) => {
		if (property === 'recrawlData') return null;

		if (property === 'metaData') {
			return <MetaData metaData={video.metaData} Cell={Cell} />;
		}

		if (['crawlerAuditData', 'crawlerInstructionsData'].includes(property)) {
			return Object.keys(video[property])
				.map((nestedProp) => (
					<Cell key={`${nestedProp}-${video[property][nestedProp]}`} displayKey={nestedProp} value={video[property][nestedProp]} />
				));
		}

		if (property === 'channelsData') {
			return <ChannelsData channelsData={video.channelsData} Cell={Cell} />;
		}

		return <Cell key={`${property}-${video[property]}`} displayKey={property} value={video[property]} />;
	});
};
