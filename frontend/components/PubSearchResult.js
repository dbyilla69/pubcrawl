import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export default ({ pub }) => (
	<Link href={`/videos?id=${pub.id}&name=${pub.name}`}>
		<a>
			<ResultStyles>
				<span>{pub.id}</span>
				<SeparatorStyles> || </SeparatorStyles>
				<span>{pub.description}</span>
				<SeparatorStyles> || </SeparatorStyles>
				<span>{pub.name}</span>
			</ResultStyles>
		</a>
	</Link>
);

const ResultStyles = styled.div`
	margin: 10px 0;
	padding: 10px;
	border: 1px solid ${(props) => props.theme.blue};
	border-radius: 1px;
	font-weight: 600;
	letter-spacing: 0.5px;
`;

const SeparatorStyles = styled.span`
	color: ${(props) => props.theme.blue};
	font-weight: 400;
`;
