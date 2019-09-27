import Result from './PubSearchResult'

export default props => {
	const results = props.pubs.map(pub => <Result pub={pub} key={pub.name} />)
	return <div>{results}</div>
}
