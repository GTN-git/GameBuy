import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Form, Button, Input } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const validateEmail = async () => {
      const email = event.target.email;
      const reg = /^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\.([a-z\\.]{2,6})$/g;
      const test = reg.test(email);
      if (test) {
        this.setState({value: email});
        return true;
      } else {
        setErrorMessage("Please enter a valid email.");
        return false;
      }
    }

    if(validateEmail) {
    // tries to add user and displays error when it encounteres one
      try {
        const { data } = await addUser({
          variables: { ...userFormData }
        });

        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
        setErrorMessage('Username or email already in use or invalid credential');
        setShowAlert(true);
      }
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  // login componet to be displayed
  return (
    <>
      <>
        {showAlert &&
          <>
            <Message negative>
              <Message.Header>{errorMessage}</Message.Header>
              <p>please enter a valid email and/or username</p>
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
              />
            </Form.Group>
          </Form>

          <Form>
            <Form.Group>
              <Form.Field
                id="form-input-control-error-username"
                control={Input}
                label="Username"
                placeholder="coolguy"
                value={userFormData.username}
                name="username"
                onChange={handleInputChange}
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
            disabled={!(userFormData.email && userFormData.username && userFormData.password)}
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </Form>
      </>
    </>
  );
};

export default SignupForm;

