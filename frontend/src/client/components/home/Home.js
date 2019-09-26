import React, { Fragment, useState } from 'react';
import { ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import { FormControl, InputGroup } from 'react-bootstrap';
import debounce from 'lodash.debounce'
import Results from './Results';

export const ALL_PUBLISHERS_QUERY = gql`
    query ALL_PUBLISHERS_QUERY($name: String, $description: String, $id: ID) {
        allPublishers(name: $name, description: $description, id: $id) {
            name
            id
            description
        }
    }
`

export const CURRENT_PUBLISHER_QUERY = gql`
  query CURRENT_PUBLISHER_QUERY {
    currentPublisher {
      name
      id
      description
    }
  }
`

function Home() {
  const [searchType, setSearchType] = useState("name")
  const [loading, setLoading] = useState(false)
  const [pubs, setPubs] = useState([])


  const onChange = debounce(async (e, client) => {
    if (e.target.value.length < 3) return setPubs([])

    setLoading(true)
    const resp = await client.query({
      query: ALL_PUBLISHERS_QUERY,
      variables: { [searchType]: e.target.value }
    })

    setPubs(resp.data.allPublishers)
    setLoading(false)
  }, 200)

  return (
    <Fragment>
        <ApolloConsumer>
          {client => (
            <>
              <div className="radio-button-container">
                <span className="radio-search-by">SEARCH BY:</span>
                <label className="radio-name">
                NAME
                  <input name="searchBy" type="radio" value="name" checked={searchType === "name"} onChange={e => setSearchType(e.target.value)}/>
                </label>
                <label className="radio-description">
                DESCRIPTION
                  <input name="searchBy" type="radio" value="description" checked={searchType === "description"} onChange={e => setSearchType(e.target.value)}/>
                </label>
                <label className="radio-id">
                  ID
                  <input name="searchBy" type="radio" value="id" checked={searchType === "id"} onChange={e => setSearchType(e.target.value)}/>
                </label>
              </div>

              <InputGroup className="mb-3">
              <div className="beer-mug"></div>
                  <FormControl
                    placeholder="Search for Publisher"
                    className="pub-input-search"
                    onChange={e => {
                      e.persist()
                      onChange(e, client)
                    }}
                  />
                </InputGroup>
                {
                  loading &&
                  <p className="loading-img-container">
                    <img className="loading-img" alt="pubcrawl-logo" src="http://cdn.taboola.com/static/impl/png/pubcrawl-transparent-2.png" />
                  </p>
                }
                {!loading && <Results pubs={pubs}/>}
              </>
            )
          }
        </ApolloConsumer>
    </Fragment>
  )
}

export default Home;
