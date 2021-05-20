import React from 'react'
import Pages from './pages/index'
import {
  gql,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import GlobalStyle from './components/GlobalStyle'
import { BrowserRouter } from 'react-router-dom'
const uri = 'https://nameless-citadel-34472.herokuapp.com/api'
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()
const data = { isLoggedIn: !!localStorage.getItem('token') }
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token')||'',
    },
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  typeDefs: {},
  defaultOptions: {
    mutate: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
  },
  connectToDevTools: true,
})
client.writeQuery({
  query: gql`
    query IsLoggedIn {
      isLoggedIn
    }
  `,
  data,
})

client.onResetStore(() => {
  cache.writeQuery({
    query: gql`
      query IsLoggedIn {
        isLoggedIn
      }
    `,
    data,
  })
})
console.log(data.isLoggedIn)
const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

export default App
