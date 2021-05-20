import { gql, useApolloClient, useMutation } from '@apollo/client'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { H1 } from '../components/H1'
import { SIGN_UP } from '../gql/mutations'
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
const SignUp = () => {
  const [values, setValues] = useState()
  const client = useApolloClient()
  const history = useHistory()
  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp)
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
    <div>
      <H1>Hi</H1>
      <Form>
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          id="username"
          required={true}
          type="text"
          onChange={onChange}
        />
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          id="email"
          required={true}
          type="email"
          onChange={onChange}
        />
        <Label htmlFor="password">Password</Label>
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
            signUp({
              variables: {
                username: values.username[0],
                password: values.password[0],
                email: values.email[0],
              },
            })
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default SignUp
