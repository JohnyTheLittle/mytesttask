import { useApolloClient, useMutation, gql } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { H1 } from '../components/H1'
import { SIGN_IN } from '../gql/mutations'
import { useHistory } from 'react-router'
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  width: 15rem;
  height: 2rem;
  margin: 1em;
`
const Label = styled.label`
  color: white;
  font-size: 1.2rem;
`
const SignIn = () => {
  const [values, setValues] = useState()
  const client = useApolloClient()
  const history = useHistory()
  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn)
      client.writeQuery({
        query: gql`
          query IsLoggedIn {
            isLoggedIn
          }
        `,
        data: { isLoggedIn: true },
      })
      history.push('/')
    },
  })
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: [event.target.value],
    })
    console.log(values)
  }
  return (
    <React.Fragment>
      <H1>Sign in</H1>
      <Form>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          id="email"
          required={true}
          type="email"
          onChange={onChange}
        />
        <Label htmlFor="password">Username</Label>
        <Input
          name="password"
          id="password"
          required={true}
          type="password"
          onChange={onChange}
        />
        <Button
          onClick={(e) => {
            e.preventDefault()
            signIn({
              variables: {
                password: values.password[0],
                email: values.email[0],
              },
            })
          }}
        >
          Submit
        </Button>
      </Form>
    </React.Fragment>
  )
}
export default SignIn
