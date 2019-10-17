import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default () => {
	const router = useRouter();
	const [search, setSearch] = useState({
		video_url: '',
		video_id: '',
	});
	const handleChange = (e) => setSearch({ ...search, [e.target.name]: e.target.value });

	const handleSubmit = (e, searchType) => {
		e.preventDefault();
		const { id, name } = router.query;
		const searchQuery = search[searchType];
		router.push({
			pathname: '/videos/search',
			query: {
				id,
				name,
				searchQuery,
				searchType,
			},
		});
	};

	return (
		<>
			<h1>Search</h1>
			<Form onSubmit={(e) => handleSubmit(e, 'video_id')}>
				<label htmlFor="video_id-input">
					<span>By ID</span>
					<input
						id="video_id-input"
						type="text"
						placeholder="Search by trc.videos.id"
						name="video_id"
						onChange={handleChange}
					/>
				</label>
				<button type="submit" disabled={search.video_id.length < 5}>Go ▷</button>
			</Form>
			<Form onSubmit={(e) => handleSubmit(e, 'video_url')}>
				<label htmlFor="video_url-input">
					<span>By Url</span>
					<input
						id="video_url-input"
						type="text"
						placeholder="Search by URL"
						name="video_url"
						onChange={handleChange}
					/>
				</label>
				<button type="submit" disabled={search.video_url.length < 15}>Go ▷</button>
			</Form>
			{router.query.searchQuery && (
				<Link href={`/videos?id=${router.query.id}&name=${router.query.name}`}>
					<a style={{ fontWeight: 600 }}>Back to all videos</a>
				</Link>
			)}
		</>
	);
};

const Form = styled.form`
	span {
		font-weight: 600;
		display: block;
	}

	input {
		font-size: 1.5rem;
		line-height: 2;
		width: calc(100% - 60px);
		padding: 5px;
		border: 1px solid black;
		border-radius: 5px;
	}

	button {
		margin: 15px 2px;
		font-size: 1.6rem;
		line-height: 1.5;
		letter-spacing: 0.5px;
		background: transparent;
		color: ${(props) => props.theme.darkblue};
		border: none;
		cursor: pointer;

		&[disabled] {
			color: grey;
		}
	}
`;
