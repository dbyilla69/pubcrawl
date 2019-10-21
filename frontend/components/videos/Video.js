import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import makeCellComponent from './VideoDataCellHOC';
import VideoData from './VideoData';
import RecrawledVideo from './RecrawledVideo';

const RECRAWL_MUTATION = gql`
	mutation ($publisher_name: String!, $pub_item_id: String!) {
		recrawl(publisher_name: $publisher_name, pub_item_id: $pub_item_id) {
			message
		}
	}
`;

// TODO: Make sure this recrawling doesn't trigger a re-render of AllVideosPage.js

export default ({ video, idx, filters }) => {
	const [recrawled, setRecrawled] = useState(false);

	const [mutate, { error, loading }] = useMutation(
		RECRAWL_MUTATION,
		{
			variables: video.recrawlData,
			onCompleted: () => setRecrawled(true),
		},
	);

	const isEven = idx % 2 === 0;
	const Cell = makeCellComponent();

	const recrawlSwitch = () => {
		switch (true) {
		case loading: {
			return 'Updating crawler instructions...';
		}
		case error: {
			return `Error: ${error.message}`;
		}
		default: {
			return (
				<button type="button" onClick={() => mutate()}>
					Recrawl
				</button>
			);
		}
		}
	};

	return (
		<VideoResult
			key={Math.floor(Math.random() * 1000000)}
			className={isEven ? 'even' : 'odd'}
		>
			{recrawlSwitch()}
			{
				recrawled
					? <RecrawledVideo Cell={Cell} refetchData={video.refetchData} filters={filters} />
					// : <RecrawledVideo Cell={Cell} refetchData={video.refetchData} filters={filters} />
					: <VideoData video={video} Cell={Cell} />
			}
		</VideoResult>
	);
};

const VideoResult = styled.div`
	margin: 50px 0;
	padding-bottom: 50px;

	&.even {
		border-bottom: 4px solid ${(props) => props.theme.grey};
	}

	&.odd {
		border-bottom: 4px solid ${(props) => props.theme.blue};
	}

	div.cell {
		display: grid;
		grid-template-columns: 250px auto;
		justify-content: start;
		word-break: break-word;

		&.even {
			background-color: ${(props) => props.theme.lightgrey};
		}
	}
	span.key {
		font-weight: bold;
		padding-left: 5px;
	}

	h3 {
		margin: 20px 0 0;
		color: ${(props) => props.theme.blue};
	}
`;
