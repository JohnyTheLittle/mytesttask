import { gql } from '@apollo/client'

const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`

const GET_PROFILE = gql`
  query me {
    me {
      username
      id
      admin
    }
  }
`
export { IS_LOGGED_IN, GET_PROFILE }
