import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Videos from './Videos';
import Filters from './Filters';
import Pagination from './PaginationSwitch';
import Error from './Error';
import Loading from './Loading';
import NoResults from './NoResults';
import { defaultFilters, applyFilters } from '../lib/videoFilters';
import { ALL_VIDEOS_QUERY } from '../lib/queries';

export default (props) => {
	const { id, name } = props.publisher;
	const [filters, setFilters] = useState(defaultFilters);
	const [recommendableFilter, setRecommendableFilter] = useState('BOTH');

	const { data, error, loading } = useQuery(ALL_VIDEOS_QUERY, {
		variables: {
			publisher_id: parseInt(id, 10),
			publisher_name: name,
			recommendable_filter: recommendableFilter,
			page: props.page || 1,
		},
	});

	const paginationData = data && data.allVideos.pageInfo;

	const statusSwitch = () => {
		if (loading) return <Loading />;
		if (error) return <Error error={error} />;

		const noResults = data.allVideos.pageInfo.totalPages === 0;

		if (noResults) return <NoResults />;

		const mappedVideoData = data.allVideos.edges.map((video) => applyFilters({ video, filters }));
		return <Videos videos={mappedVideoData} />;
	};


	return (
		<Layout>
			<Filters
				filters={filters}
				setFilters={setFilters}
				setRecommendableFilter={setRecommendableFilter}
				recommendableFilter={recommendableFilter}
				disabledFields={[]}
			/>
			<div style={{ minHeight: '80vh', position: 'relative' }}>
				{
					paginationData
					&& <Pagination top paginationData={paginationData} loading={loading} page={props.page} />
				}
				{ statusSwitch() }
				{
					paginationData
					&& <Pagination top={false} paginationData={paginationData} loading={loading} page={props.page} />
				}
			</div>
		</Layout>
	);
};

const Layout = styled.main`
	display: grid;
	grid-template-columns: 1fr 4fr;
	grid-column-gap: 50px;
`;
