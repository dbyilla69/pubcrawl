import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

const SET_PUBLISHER_MUTATION = gql`
	mutation setPublisherMutation(
		$id: Int!
		$publisher_name: String!
		$description: String!
	) {
		setPublisher(
			id: $id
			publisher_name: $publisher_name
			description: $description
		) @client {
			id
		}
	}
`

export default ({ pub }) => {
	const router = useRouter()
	const [setPublisher] = useMutation(SET_PUBLISHER_MUTATION)
	

	return (
		<a
			href={`/publishers/${pub.id}`}
			onClick={async e => {
				e.preventDefault()
				e.persist()
				const variables = {
					id: parseInt(pub.id, 10),
					publisher_name: pub.name,
					description: pub.description,
				}

				await setPublisher({ variables })
				
				router.push(`/publishers/${pub.id}`)
			}}
		>
			<div className="result-container">
				<span className="result-item result-id">{pub.id}</span>
				<span className="result-item result-description">{pub.description}</span>
				<span className="result-item result-name">{pub.name}</span>
			</div>
		</a>
	)
}
