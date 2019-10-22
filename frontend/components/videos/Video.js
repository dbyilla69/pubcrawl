import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import makeCellComponent from './VideoDataCellHOC';
import VideoData from './VideoData';
import Error from '../Error';
import RECRAWL_MUTATION from '../../lib/mutations';

export default ({ video, idx }) => {
	const [recrawl, { error, loading }] = useMutation(
		RECRAWL_MUTATION,
		{
			variables: video.recrawlData,
			onError: () => {},
		},
	);

	const isEven = idx % 2 === 0;
	const Cell = makeCellComponent();

	return (
		<VideoResult
			key={Math.floor(Math.random() * 1000000)}
			className={isEven ? 'even' : 'odd'}
		>
			<button type="button" onClick={() => recrawl()} disabled={loading}>
					Recrawl
			</button>
			{ error && <span>{error.message}</span>}
			{ loading && <span>Recrawling...</span>}
			<VideoData video={video} Cell={Cell} />
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
