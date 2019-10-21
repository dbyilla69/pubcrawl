import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Videos from './videos/Videos';
import Filters from './Filters';
import Error from './Error';
import Loading from './Loading';
import NoResults from './NoResults';
import { defaultFilters, applyFilters } from '../lib/videoFilters';
import { VIDEOS_WHERE_URL_QUERY, VIDEO_WHERE_ID_QUERY } from '../lib/queries';

export default (props) => {
	const { id, name } = props.publisher;
	const { searchQuery, searchType } = props;
	const [filters, setFilters] = useState(defaultFilters);
	const query =		searchType === 'video_url' ? VIDEOS_WHERE_URL_QUERY : VIDEO_WHERE_ID_QUERY;

	const { data, error, loading } = useQuery(query, {
		variables: {
			publisher_id: parseInt(id, 10),
			publisher_name: name,
			[searchType]: searchQuery,
		},
	});

	const statusSwitch = () => {
		if (loading) return <Loading />;
		if (error) return <Error error={error} />;

		if (searchType === 'video_url') {
			const mappedVideoData = data.videosWhereUrl.map((video) => applyFilters({ video, filters }));

			if (!mappedVideoData.length) return <NoResults />;

			return <Videos videos={mappedVideoData} />;
		}

		if (!data.videoWhereId) return <NoResults />;
		return <Videos videos={[applyFilters({ video: data.videoWhereId, filters })]} />;
	};

	return (
		<Layout>
			<Filters
				filters={filters}
				setFilters={setFilters}
				setRecommendableFilter={() => {}}
				recommendableFilter={() => {}}
				disabledFields={['recommendable']}
			/>
			{statusSwitch()}
		</Layout>
	);
};

const Layout = styled.main`
	display: grid;
	grid-template-columns: 1fr 4fr;
	grid-column-gap: 50px;
`;
