import styled from 'styled-components'

export default (props) => (
	<PaginationStyles top={props.top}>
		<span>First Page</span>|<span>Prev</span><span>Page 1 of ?</span>|<span>Next</span>|<span>Last Page ?</span>
	</PaginationStyles>
)

const PaginationStyles = styled.div`
	position: absolute;
	left: calc(50% - 400px);
	top: ${(props) => (props.top ? 0 : null)};
	bottom: ${(props) => (props.top ? null : 0)};
	font-size: 1.6rem;
	font-weight: 500;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	width: 800px;
	justify-content: space-between;
	text-align: center;

	span {
		width: 180px;
	}
`
