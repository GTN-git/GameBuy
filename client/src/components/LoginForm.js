// see SignupForm.js for comments
import React, { useState } from "react"
import { Form, Button, Input, Message } from "semantic-ui-react"

// import { loginUser } from '../utils/API';
import { LOGIN_USER } from "../utils/mutations"
import Auth from "../utils/auth"
import { useMutation } from "@apollo/client"

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" })
  const [validated] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { error }] = useMutation(LOGIN_USER)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUserFormData({ ...userFormData, [name]: value })
    console.log(event.target.name, ':', event.target.value)
  }

  const validate = (event) => {
    const email = event.target.email;
    const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g;
    const test = reg.test(email);
    if (test) {
      alert('pass');
      this.setState({value: email});
    }
  }




  const handleFormSubmit = async (event) => {
    event.preventDefault()
    

    try {
      const response = await login({ variables: { email: userFormData.email, password: userFormData.password } });
      console.log(response);
      const token = response.data.login.token;
      console.log(token);
      Auth.login(token)
    } catch (e) {
      console.error(e);
      setErrorMessage("Invalid Credential")
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    })
  }

  return (
    <>
      {showAlert &&
        <>
          <Message negative>
            <Message.Header>{errorMessage}</Message.Header>
            <p>please enter a new email and/or password</p>
          </Message>
        </>
      }
      <Form onSubmit={handleFormSubmit}>
        <Form>
          <Form.Group>
            <Form.Field
              id="form-input-control-error-email"
              control={Input}
              label="Email"
              placeholder="joe@schmoe.com"
              value={userFormData.email}
              name="email"
              onChange={handleInputChange}
              onBlur={validate}
            />
          </Form.Group>
        </Form>

        <Form.Field
          value={userFormData.password}
          onChange={handleInputChange}
        >
          <label>Enter Password</label>
          <Input name='password' type="password" />
        </Form.Field>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
