import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Form, Button, Input } from 'semantic-ui-react';

import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [addUser, { error}] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const {data}= await addUser({
        variables: {...userFormData}
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setErrorMessage(e)
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
  <>
      { showAlert && 
        <>
          <h2>{errorMessage}</h2>
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

