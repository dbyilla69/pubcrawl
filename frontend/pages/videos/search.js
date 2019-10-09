import VideosWhereUrlPage from '../../components/VideosWhereUrlPage'
import VideoWhereIdPage from '../../components/VideoWhereIdPage'

export default props => {
	const { name, id, searchType, searchQuery } = props.query

	if (searchType === 'url') {
		return <VideosWhereUrlPage publisher={{ name, id }} search={searchQuery} />
	} else {
		return <VideoWhereIdPage publisher={{ name, id }} search={searchQuery} />
	}
}
