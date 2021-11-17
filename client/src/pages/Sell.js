import React, { Component } from 'react'
import { Button, Form, Card, Pagination, Image, Grid } from 'semantic-ui-react'
import { searchGames } from '../utils/API'
import { getYear } from '../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SEARCH_RESULTS } from '../utils/actions';

class SearchBox extends Component {
    render() {
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Form.Field>
                    <label>Game Title</label>
                    <div className="ui action input">
                        <input type="text" placeholder='Search for a game to sell...' name='game' required />
                        <button class="ui button">Search</button>
                    </div>
                </Form.Field>
            </Form>
        )
    }
}

const Sell = () => {
    const [state, dispatch] = [useSelector(state => state), useDispatch()];
    const { searchResults } = state;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const results = await searchGames(event.target.game.value);

        if (results.length) {
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                searchResults: results
            });
        }
    }

    const cardColors = (rating) => {
        switch (true) {
            case rating <= 25: return 'red';
            case rating <= 50: return 'yellow';
            case rating <= 75: return 'blue';
            case rating >= 76: return 'green';
            default: return 'green';
        }
    }

    const componentCleanup = () => {
        dispatch({
            type: UPDATE_SEARCH_RESULTS,
            searchResults: []
        });
    }

    return (
        <Grid columns='equal'>
            <Grid.Row>
                <SearchBox componentCleanup={componentCleanup} onSubmit={handleSubmit} />
            </Grid.Row>
            <Grid.Row>
                <Grid>
                    {searchResults.length > 0 ?
                        <div>
                            { searchResults.length > 10 &&
                                <Grid.Row>
                                    <Pagination defaultActivePage={1} totalPages={Math.floor(searchResults.length / 10)} />
                                </Grid.Row>
                            }
                            <Grid.Row>
                                <Card.Group itemsPerRow={2}>
                                    {searchResults.map((game, i) => (
                                        <Card color={cardColors(Math.round(game.rating))} fluid key={i}>
                                            <Card.Content>
                                                <Image src={"https:" + game.cover.url} alt={game.name} floated="right" size="small" />
                                                <Card.Header>{game.name}</Card.Header>
                                                <Card.Meta>Released: {getYear(game.first_release_date)}</Card.Meta>
                                                <Card.Description>User Ratings: {Math.round(game.rating)} / 100</Card.Description>
                                                <Card.Content extra>
                                                    <div className='ui two buttons'>
                                                        <Button basic color='green'>
                                                            Sell this game!
                                                        </Button>
                                                    </div>
                                                </Card.Content>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Card.Group>
                            </Grid.Row>
                        </div>
                        :
                        <div>
                            <Grid.Row>
                                <h2><span role="img" aria-label="chicken">🐔</span> Nothing here but us chickens...</h2>
                            </Grid.Row>
                        </div>
                    }
                </Grid>
            </Grid.Row>
        </Grid>
    )
}

export default Sell