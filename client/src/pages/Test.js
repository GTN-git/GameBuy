import React from "react";
import { Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Test = () => {
    const [login, { error }] = useMutation(LOGIN_USER);
    const [register, { err }] = useMutation(ADD_USER);

    const loginFxn = async () => {
        console.log('click');
        try {
            const response = await login({ variables: { email: 'hello', password: 'world' }});
            console.log(response);
            const token = response.data.login.token;
            console.log(token);
            Auth.login(token);
          } catch (e) {
            console.error(e)
          }
    }

    const signupFxn = async () => {
        try {
            const response = await register({ variables: { email: 'hello', username:'foobar', password: 'world' }});
            console.log(response);
            const token = response.data.login.token;
            console.log(token);
            Auth.login(token);
          } catch (e) {
            console.error(e)
          }
    }


    return (
        <>
            <Button onClick={loginFxn}>Login button</Button>
            <Button onClick={signupFxn}>Signup button</Button>
        </>
    )
}

export default Test