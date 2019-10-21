import VideosPage from '../../components/AllVideosPage';

export default (props) => {
	const { name, id, page } = props.query;

	return <VideosPage publisher={{ name, id }} page={parseInt(page, 10)} />;
};
