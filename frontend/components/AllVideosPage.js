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

	const {
		data, error, loading, refetch, networkStatus,
	} = useQuery(ALL_VIDEOS_QUERY, {
		variables: {
			publisher_id: parseInt(id, 10),
			publisher_name: name,
			recommendable_filter: recommendableFilter,
			page: props.page || 1,
		},
		notifyOnNetworkStatusChange: true,
	});

	const paginationData = data && data.allVideos.pageInfo;

	const statusSwitch = () => {
		if (loading || networkStatus === 4) return <Loading />;
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
					&& (
						<TopContainer>
							<div>
								<Pagination paginationData={paginationData} loading={loading} page={props.page} />
							</div>
							<button
								id="refresh-button"
								type="button"
								onClick={() => refetch()}
							>
									Refresh Results &#8635;
							</button>
						</TopContainer>
					)
				}
				{ statusSwitch() }
				{
					paginationData
					&& <Pagination paginationData={paginationData} loading={loading} page={props.page} />
				}
			</div>
		</Layout>
	);
};

const Layout = styled.main`
	display: grid;
	grid-template-columns: 1fr 4fr;
	grid-column-gap: 50px;

	#refresh-button {
		font-size: 1.6rem;
		padding: 5px;
		background: transparent;
		color: ${(props) => props.theme.blue};
		font-weight: 500;
		border: none;
		border-radius: 5px;
	}
`;

const TopContainer = styled.div`
	display: flex;
	justify-content: space-around;
`;
