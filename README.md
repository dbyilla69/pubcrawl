# pubcrawl

Pubcrawl is a tool to help the Professional Services organization at Taboola access the status of our various databases. Many of the datasets that we need to see together exist across multiple databases and manually writing SQL to query them can be slow and painful.

Pubcrawl solves this by allowing us to start with all of the datasets and then filter those that what we need. This is done by leveraging the power of Graphql with Apollo Server and Dataloader for the backend and Next.js with Apollo Client for the frontend.

## Frontend

**lib**

Contains utilities for things like filtering the data that is rendered to the client, dynamically making input checkboxes, setting up our Apollo Client, and a file to export all of the large queries used in the application.

**components**
Standard folder for storing components.

**pages**
Next.js directory that defines and renders our routes.

**next.config.js**
Custom config file that allows us to use environment variables in our client.

---

## Backend

**index.js**
Sets up our Apollo Server instance.

**schema.js**
Exports our GraphQL schema with cache hint directives from apollo server.

**config.js**
If we ever need to change the pagination rules of our server and site, just change the `perPage` value here and it will ripple through the client and server.

**utils**
```
	|
	|- DataLoader.js - exports a function that creates three DataLoader instances with some scoped information about the current publisher.
	|
	|- PubCrawlDB - a utility for interacting running more complex transactions in the database.
```

**resolvers**
Contains our top-level Query resolvers and resolvers for our nested Videos that use our DataLoaders.

**db**
Sets up our database pool cluster and gives us a function that runs sql against connections and releases the connections when finished.
