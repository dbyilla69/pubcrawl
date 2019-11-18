/* eslint-disable comma-dangle */
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Video from './Video';
import makeCSVHref from '../../lib/makeCSVHref';

export default (props) => {
	const Router = useRouter();
	const pubName = Router.query.name;
	const page = Router.query.page || 1;
	const mappedVids = props.videos.map((video, idx) => (
		<Video video={video} idx={idx} key={video.id} />
	));

	return (
		<>
			<div style={{
				maxWidth: '1280px', position: 'relative', height: '42px', marginLeft: '80px'
			}}
			>
				<DownloadStyles
					href={makeCSVHref(props.videos)}
					download={`pubcrawl-${pubName}-page-${page}.csv`}
				>
					Download CSV &#x21E9;
				</DownloadStyles>
			</div>
			<div key={Math.floor(Math.random() * 1000000)}>
				{mappedVids}
			</div>
		</>
	);
};


const DownloadStyles = styled.a`
	position: absolute;
	top: 20px;
	right: 10px;
	font-size: 1.6rem;
	padding: 2px 10px;
	border: 1px solid ${(props) => props.theme.yellow};
	background: ${(props) => props.theme.yellow}55;
	border-radius: 5px;
	color: ${(props) => props.theme.blue};
	font-weight: 500;
	cursor: pointer;
`;
