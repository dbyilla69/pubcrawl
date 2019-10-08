import VideosPage from '../components/VideosPage'

export default props => {
	const { name, id } = props.query

	return <VideosPage publisher={{ name, id }} />
}
