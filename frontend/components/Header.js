import styled from 'styled-components';

export default () => (
	<Header style={{ textAlign: 'center' }}>Pub Crawler</Header>
);

const Header = styled.header`
	text-align: center;
	font-size: 8rem;
	font-weight: 200;
	letter-spacing: 5px;
	color: ${(props) => props.theme.darkblue};
`;
