import React from 'react';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'



const SET_PUBLISHER_MUTATION = gql`
    mutation setPublisherMutation($id: Int!, $publisher_name: String!, $description: String!) {
        setPublisher(id: $id, publisher_name: $publisher_name, description: $description) @client {
            id
        }
    }
`

function Result(props) {
    const [setPublisher] = useMutation(SET_PUBLISHER_MUTATION)

    return (
        <Link 
            to={`/publisher/${props.id}`} 
            onClick={async (e) => {
                e.persist()
                const variables = { id: parseInt(props.id, 10), publisher_name: props.name, description: props.description }
                setPublisher({ variables })
            }}
        >
            <div className="result-container">
                <span className="result-item result-id">{props.id}</span>
                <span className="result-item result-description">{props.description}</span>
                <span className="result-item result-name">{props.name}</span>
            </div>
        </Link>
    )
}

export default Result;
