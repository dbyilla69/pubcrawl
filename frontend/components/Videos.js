import styled from 'styled-components'
import { nestedProperties } from '../lib/videoFilters'

export default props => {
	const makeCell = ({ key, value }) => {
		return (
			<div key={`${key}:${value}${Math.floor(Math.random() * 100)}`}>
				{key}: {value}
			</div>
		)
	}

	const mappedVids = props.videos.map(video => (
		<VideoGrid key={Math.floor(Math.random() * 1000000)}>
			{Object.keys(video).map(property => {
				if (nestedProperties.includes(property)) {
					return Object.keys(video[property]).map(nestedProp =>
						makeCell({ key: nestedProp, value: video[property][nestedProp] })
					)
				}

				return makeCell({ key: property, value: video[property] })
			})}
		</VideoGrid>
	))
	return <div>{mappedVids}</div>
}

const VideoGrid = styled.div`
	display: grid;
`
