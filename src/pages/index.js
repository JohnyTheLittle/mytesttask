import React from 'react'
import Layout from '../components/Layout'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  BrowserRouter,
} from 'react-router-dom'
import Home from './home'
import SignIn from './SignIn'
import SignUp from './SignUp'
const Pages = () => {
  return (
    <Layout>
      <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signup" component={SignUp}/>
      </Router>
    </Layout>
  )
}
export default Pages
