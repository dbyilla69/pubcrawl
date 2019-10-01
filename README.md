# pubcrawl

Pubcrawl is a tool to help the Professional Services organization at Taboola access the status of our various databases. Many of the datasets that we need to see together exist across multiple databases and manually writing SQL to query them can be slow and painful.

Pubcrawl solves this by allowing us to start with all of the datasets and then filter those that what we need. This is done by leveraging the power of GraphQL with Dataloader for the backend and Next.js with Apollo Client for the frontend.
