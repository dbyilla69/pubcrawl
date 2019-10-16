import styled from 'styled-components';
import Result from './PubSearchResult';

export default (props) => {
	const results = props.pubs.map((pub) => <Result pub={pub} key={pub.name} />);
	return <Container>{results}</Container>;
};

const Container = styled.div`
	max-width: 900px;
	margin: 50px auto;
`;
