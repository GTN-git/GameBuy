import React, { useState } from 'react'
import { Card, Pagination, Grid } from 'semantic-ui-react'
import { searchGames } from '../utils/API'
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SEARCH_RESULTS } from '../utils/actions';
import SellCard from '../components/SellCard';
import SearchBox from '../components/SearchBox';
import SellModal from '../components/SellModal';

const Sell = () => {
    const [state, dispatch] = [useSelector(state => state), useDispatch()];
    const [showModal, setShowModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState({});
    const [gameForSale, setGameForSale] = useState({});
    const { searchResults } = state;

    const handleSearch = async (event) => {
        event.preventDefault();

        const results = await searchGames(event.target.game.value);

        if(results.length) {
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                searchResults: results
            });
        }
    }

    const handleSubmit = () => {
        console.log("SELLING!");
    }

    return (
        <>
            <Grid columns='equal'>
                <Grid.Row>
                    <SearchBox onSubmit={handleSearch} />
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
                                            <SellCard game={game} index={i} setSelectedGame={setSelectedGame} setShowModal={setShowModal} key={i}/>
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
            <SellModal showModal={showModal} setShowModal={setShowModal} game={selectedGame} onClick={handleSubmit} setSale={setGameForSale}/>
        </>
    )
}

export default Sell