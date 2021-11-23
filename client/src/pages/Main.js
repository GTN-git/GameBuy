import React from "react";
import { useQuery } from '@apollo/client';
// import { ALL_USERS } from '../utils/queries';
import { ALL_GAMES } from "../utils/queries";
// import { getDataFromTree } from "@apollo/client/react/ssr";
import { Container, Grid, Card, Dimmer, Loader } from 'semantic-ui-react';

function Main() {
    const { loading, data } = useQuery(ALL_GAMES);
    // const {loading, data} =useQuery()
    let games;

    if (data) {
        console.log(data)
        games = data;
    }

    return (
        <>
            {loading ?
                <div>
                    <Dimmer active={loading} inverted size='massive'>
                        <Loader inverted>Loading...</Loader>
                    </Dimmer>
                </div> : (
                    <div>

                    </div>
                )}

        </>
    )
}

export default Main;