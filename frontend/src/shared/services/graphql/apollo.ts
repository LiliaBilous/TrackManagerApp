import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

// HTTP link for queries & mutations
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
})


// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_API_WS_URL,
  })
)

// split based on operation type
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
