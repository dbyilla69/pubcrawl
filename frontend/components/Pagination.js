import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default props => {
	const router = useRouter()
	const { id, name } = router.query
	const currentPage = parseInt(router.query.page, 10) || 1
	const { totalPages, hasNextPage } = props.data

	// should look like First Page | Prev | currentnumber | Next | Last Page (number)
	return (
		<PaginationStyles>
			{currentPage > 1 && (
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
			)}
			<span>
				Page {currentPage} of {totalPages}
			</span>
			{hasNextPage && (
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
			)}
		</PaginationStyles>
	)
}

const PaginationStyles = styled.div`
	font-size: 1.6rem;
	font-weight: 500;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	width: 800px;
	justify-content: space-between;
	text-align: center;

	a {
		color: ${props => props.theme.blue};
	}
`
