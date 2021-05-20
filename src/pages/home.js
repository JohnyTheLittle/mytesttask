import { ApolloClient, useApolloClient, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { H1 } from '../components/H1'
import Spinner from '../components/Spinner'
import { useHistory } from 'react-router'

import { GET_PROFILE, IS_LOGGED_IN } from '../gql/query'

const Home = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN)
  const { data, loading, error } = useQuery(GET_PROFILE)
  const history = useHistory()
  const client = useApolloClient()
  const logOut = (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } })
    history.push('/')
  }
  console.log('isLoggedIn', isLoggedIn)
  if (!isLoggedIn.isLoggedIn) {
    return (
      <React.Fragment>
        <h1 style={{ fontSize: '4em', color: 'white' }}>Hello there</h1>
        <h2 style={{ color: 'white', margin: '4%' }}>Here is my test task</h2>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
        <Link to="/signin">
          <Button>Log In</Button>
        </Link>
      </React.Fragment>
    )
  } else {
    return loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <H1>Hello, {data.me.username}</H1>
        <Button onClick={logOut}>Log out</Button>
        {data.me.admin ? <H1>You are admin</H1> : <H1>You are not admin</H1>}
      </React.Fragment>
    )
  }
}

export default Home
