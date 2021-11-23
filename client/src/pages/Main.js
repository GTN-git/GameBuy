import React from "react";
import { useQuery } from '@apollo/client';
import { ALL_USERS } from '../utils/queries';
import { getDataFromTree } from "@apollo/client/react/ssr";

function Main() {
    const { loading, data } = useQuery(ALL_USERS);
    let users;

    if (data){
        users = data.users;
        console.log(users)
    }

    return (
        <>
            {data ? (
                {}
            ) : null}
            {
                loading ? <h1> Loading... </h1> : null
            }
        </>
    )
}

export default Main;