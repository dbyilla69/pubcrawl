/* eslint-disable comma-dangle */
import Video from './Video';
import makeCSVHref from '../../lib/makeCSVHref';

export default (props) => {
	const mappedVids = props.videos.map((video, idx) => (
		<Video video={video} idx={idx} key={video.id} />
	));

	return (
		<div key={Math.floor(Math.random() * 1000000)}>
			<a href={makeCSVHref(props.videos)} download="pubcrawl-data.csv">
				download
			</a>
			{mappedVids}
		</div>
	);
};
