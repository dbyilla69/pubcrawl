import Video from './Video';

export default (props) => {
	const mappedVids = props.videos
		.map((video, idx) => <Video video={video} idx={idx} key={video.id} filters={props.filters} />);

	return <div key={Math.floor(Math.random() * 1000000)}>{mappedVids}</div>;
};
