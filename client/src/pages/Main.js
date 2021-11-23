import React from "react";
import { useQuery } from '@apollo/client';
import { ALL_USERS } from '../utils/queries';
// import { getDataFromTree } from "@apollo/client/react/ssr";
import { Container, Grid, Card, Dimmer, Loader } from 'semantic-ui-react';

function Main() {
    const { loading, data } = useQuery(ALL_USERS);
    let users;

    if (data) {
        users = data.users;
        console.log(users)
        console.log(users[0].games)
    }

    return (
        <>
            {loading ?
                <div>
                    <Dimmer active={loading} inverted size='massive'>
                        <Loader inverted>Loading...</Loader>
                    </Dimmer>
                </div> : (users ? (
                    <div>
                        {users.map(user => {
                            return (
                                <div>
                                    {!user.games ? (
                                        <div>
                                            {user.games.map(game => {
                                                return (
                                                    <div>
                                                        <h1>{user.username}</h1>
                                                        <div className='game'>
                                                            <h1>{game.name}</h1>
                                                            <img src={game.cover} />
                                                            <h1>{game.rating}</h1>
                                                            <h1>{game.platform}</h1>
                                                            <h1>{game.price}</h1>
                                                        </div>
                                                    </div>
                                                )
                                            })}</div>
                                    ) : (
                                        <div>
                                            <h1>{user.username}</h1>
                                            <div className='game'>
                                            <h1>No games being sold by This user</h1>
                                            </div>
                                        </div>
                                    )}
                                </div>)
                        })}
                    </div>
                ) : (
                    <div>
                        <h1>No users saleing at this time</h1>
                    </div>
                ))}

        </>
    )
}

export default Main;