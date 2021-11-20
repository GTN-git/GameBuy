import React from "react";
import { Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const Test = () => {
    const [login, { error }] = useMutation(LOGIN_USER);

    const loginFxn = async () => {
        console.log('click');
        try {
            const response = await login({ variables: { email: 'hello', password: 'world' }});
            console.log(response);
            const token = response.data.login.token;
            console.log(token);
          } catch (e) {
            console.error(e)
          }
    }


    return (
        <>
            <Button onClick={loginFxn}>Login button</Button>
            {/* <Button onClick={signupFxn}>Signup button</Button> */}
        </>
    )
}

export default Test