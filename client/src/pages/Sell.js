import React, { Component } from 'react'
import { Button, Form, Card, Pagination } from 'semantic-ui-react'
import { searchGames } from '../utils/API'
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SEARCH_RESULTS } from '../utils/actions';

class SearchBox extends Component {
    componentWillUnmount() {
        this.props.componentCleanup();
        window.removeEventListener('beforeunload', this.props.componentCleanup());
    }

    render() {
        return (
            <>
                <Form.Field>
                    <label>Game Title</label>
                    <input type="text" placeholder='Search for a game to sell...' name='game' required />
                </Form.Field>
                <Button type="submit" value="Submit">Search</Button>
            </>
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

    const componentCleanup = () => {
        dispatch({
            type: UPDATE_SEARCH_RESULTS,
            searchResults: []
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <SearchBox componentCleanup={componentCleanup}/>
            {searchResults.length > 0 ?
                <div>
                    <Pagination defaultActivePage={1} totalPages={searchResults.length / 10} />
                    <Card.Group>
                        {searchResults.map((game, i) => (
                            <Card fluid key={i}>
                                <h2>{game.name}</h2>
                                <h4>{game.category}</h4>
                                <img src={"https:" + game.cover.url} alt="" style={{ height: 125, width: 125 }} />
                                <h4>{Math.round(game.rating)} / 100</h4>
                            </Card>
                        ))}
                    </Card.Group>
                </div>
                :
                <div>
                    <h2>No search results...</h2>
                </div>
            }
        </Form>
    )
}

export default Sell