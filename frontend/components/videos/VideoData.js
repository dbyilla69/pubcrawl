import ChannelsData from './ChannelsData';
import MetaData from './MetaData';

export default ({ Cell, video }) => Object.keys(video).map((property) => {
	if (['recrawlData', 'refetchData'].includes(property)) return null;
	if (property === 'channelsData') {
		return <ChannelsData channelsData={video.channelsData} Cell={Cell} />;
	}

	if (property === 'metaData') {
		return <MetaData metaData={video.metaData} Cell={Cell} />;
	}

	if (['crawlerAuditData', 'crawlerInstructionsData'].includes(property)) {
		return Object.keys(video[property])
			.map((nestedProp) => (
				<Cell key={`${nestedProp}-${video[property][nestedProp]}`} displayKey={nestedProp} value={video[property][nestedProp]} />
			));
	}

	return <Cell key={`${property}-${video[property]}`} displayKey={property} value={video[property]} />;
});
