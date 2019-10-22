import { useQuery } from '@apollo/react-hooks';
import { applyFilters } from '../../lib/videoFilters';
import VideoData from './VideoData';
import { VIDEO_WHERE_ID_QUERY } from '../../lib/queries';


export default ({ refetchData, filters, Cell }) => {
	const {
		data, error, loading, startPolling,
	} = useQuery(
		VIDEO_WHERE_ID_QUERY,
		{
			variables: refetchData,
			fetchPolicy: 'network-only',
			ssr: false,
		},
	);

	if (error) return error.message;
	if (loading) return 'Recrawling...';

	return 'hello';
	// return <VideoData Cell={Cell} video={applyFilters({ video: data.videoWhereId, filters })} />;
};
