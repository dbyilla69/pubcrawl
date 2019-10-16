import Pagination from './Pagination';
import LoadingPagination from './LoadingPagination';

const PaginationSwitch = ({
	top, paginationData, loading, page,
}) => {
	const shouldShowLoading = page === 1 && loading;

	if (shouldShowLoading) {
		return <LoadingPagination top={top} />;
	}

	return <Pagination data={paginationData} top={top} />;
};

export default PaginationSwitch;
