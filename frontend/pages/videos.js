import VideosPage from '../components/VideosPage'

export default props => {
	const { name, id, page } = props.query

	return <VideosPage publisher={{ name, id }} page={page} />
}
