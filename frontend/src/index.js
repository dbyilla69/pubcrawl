import React from 'react';
import ReactDOM from 'react-dom';
import './client/assets/stylesheets/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { persistCache } from 'apollo-cache-persist'

// import { MockedProvider } from '@apollo/react-testing';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './client/App';
import * as serviceWorker from './client/serviceWorker';
import { CURRENT_PUBLISHER_QUERY } from './client/components/home/Home';

// import { GET_PUBLISHERS_QUERY } from './client/components/home/Results';
const cache = new InMemoryCache()

persistCache({
    cache,
    storage: window.localStorage 
}).then(() => {
    const client = new ApolloClient({
        uri: 'http://172.22.15.48:4000/',
        cache: cache,
        resolvers: {
            Mutation: {
                setPublisher: (parent, args, ctx, info) => {
                    const publisher = {
                        __typename: "Publisher",
                        id: args.id,
                        name: args.publisher_name,
                        description: args.description,
                    }
                    
                    ctx.cache.writeQuery({
                        query: CURRENT_PUBLISHER_QUERY,
                        data: { currentPublisher: publisher }
                    })
                    return publisher
                }
            },
            Query: {
                publisher: (parent, args, ctx, info) => {
                    const data = ctx.cache.readQuery({ query: CURRENT_PUBLISHER_QUERY })
                    
                    return data
                }
            }
        }
    });


    ReactDOM.render(
        <BrowserRouter>
            <ApolloProvider client={client} addTypename={false}>
                <App />
            </ApolloProvider>
        </BrowserRouter>,
        document.getElementById('root')
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
})
