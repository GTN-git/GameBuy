import React, { useState } from "react";
import { Container, Grid, Card, Dimmer, Loader } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { ALL_GAMES } from '../utils/queries';
import BuyCard from '../components/BuyCard'

// function that loads games and displays them to the main componet
function Main() {
    const [ games, setGames ] = useState([]);

    const { loading } = useQuery(ALL_GAMES, {
        onCompleted: data => {
            setGames(data?.games);
        }
    });

    // main component
    return (
        <>
            {!loading ? (
                <Grid>
                    <Grid.Row align centered>
                        <Container>
                            <Card.Group itemsPerRow={2}>
                            { games.map((game, index) => (
                                <>
                                <BuyCard game={game} key={index} />
                                </>
                            ))}
                            </Card.Group>
                        </Container>
                    </Grid.Row>
                </Grid>
            ) : null }
            {
                <Dimmer active={loading} inverted size='massive'>
                    <Loader inverted>Loading...</Loader>
                </Dimmer>
            }
        </>
    )
}

export default Main;