import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import makeCellComponent from './VideoDataCellHOC';
import VideoData from './VideoData';
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
					Recrawl &#8635;
			</button>
			{ error && <span>There was an issue connecting to the database. Try again.</span>}
			{ loading && (
				<>
					<span className="recrawl-message">Recrawling</span>
					<div className="spinner">
						<div className="bounce1" />
						<div className="bounce2" />
						<div className="bounce3" />
					</div>
				</>
			)}
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

	button {
		margin: 0 20px 20px 0;
		font-size: 1.6rem;
		padding: 5px;
		background: transparent;
		color: ${(props) => props.theme.blue};
		font-weight: 500;
		border: none;
		cursor: pointer;
		border-radius: 5px;

		&[disabled] {
			color: #aaa;
			cursor: initial;
		}
	}
	
	.recrawl-message {
		font-weight: 600;
		font-size: 1.6rem;
	}

	.spinner {
		width: 70px;
		text-align: center;
		display: inline-block;
	}

	.spinner > div {
		margin-left: 5px;
		width: 10px;
		height: 10px;
		background-color: #333;
		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
		animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	}

	.spinner .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	.spinner .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes sk-bouncedelay {
		0%, 80%, 100% { -webkit-transform: scale(0) }
		40% { -webkit-transform: scale(1.0) }
	}

	@keyframes sk-bouncedelay {
		0%, 80%, 100% { 
			-webkit-transform: scale(0);
			transform: scale(0);
		} 40% { 
			-webkit-transform: scale(1.0);
			transform: scale(1.0);
		}
	}
`;
