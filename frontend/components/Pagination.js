import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default (props) => {
	const router = useRouter()
	const { id, name } = router.query
	const currentPage = parseInt(router.query.page, 10) || 1
	const { totalPages, hasNextPage } = props.data

	const showPrevPageLinks = () => {
		if (currentPage <= 1) {
			return (
				<>
					<span>First Page</span>|<span>Prev</span>|
				</>
			)
		}

		return (
			<>
				<Link href={`/videos?id=${id}&name=${name}`}>
					<a>First Page</a>
				</Link>
				|
				<Link href={`/videos?id=${id}&name=${name}&page=${currentPage - 1}`}>
					<a>Prev</a>
				</Link>
				|
			</>
		)
	}

	const showNextPageLinks = () => {
		if (!hasNextPage) {
			return (
				<>
					|<span>Next</span>|<span>Last Page ({totalPages})</span>
				</>
			)
		}

		return (
			<>
				|
				<Link href={`/videos?id=${id}&name=${name}&page=${currentPage + 1}`}>
					<a>Next</a>
				</Link>
				|
				<Link href={`/videos?id=${id}&name=${name}&page=${totalPages}`}>
					<a>Last Page ({totalPages})</a>
				</Link>
			</>
		)
	}

	return (
		<PaginationStyles top={props.top}>
			{showPrevPageLinks()}
			<span>
				Page {currentPage} of {totalPages}
			</span>
			{showNextPageLinks()}
		</PaginationStyles>
	)
}

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

	a {
		color: ${(props) => props.theme.blue};
	}

	a,
	span {
		width: 180px;
	}
`
