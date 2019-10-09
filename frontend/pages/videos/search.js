import VideosSearchResults from '../../components/VideosSearchResults'

export default props => {
	const { name, id, searchType, searchQuery } = props.query

	return (
		<VideosSearchResults
			publisher={{ name, id }}
			searchQuery={searchQuery}
			searchType={searchType}
		/>
	)
}
