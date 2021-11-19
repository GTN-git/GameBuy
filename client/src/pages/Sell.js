import React, { useState } from 'react'
import { Card, Pagination, Grid, Loader } from 'semantic-ui-react'
import { searchGames } from '../utils/API'
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SEARCH_RESULTS } from '../utils/actions';
import SellCard from '../components/SellCard';
import SearchBox from '../components/SearchBox';
import SellModal from '../components/SellModal';
import Auth from '../utils/auth';
import { ADD_GAME } from '../utils/mutations';

const Sell = () => {
    const [state, dispatch] = [useSelector(state => state), useDispatch()];
    const [showModal, setShowModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState({});
    const [sellPost, setSellPost] = useState({ game: {}, user: {}, condition: 'poor', price: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { searchResults } = state;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({ curr: 1, start: 0, end: 10 });

    const handleSearch = async (event) => {
        event.preventDefault();

        setLoading(true);
        const results = await searchGames(event.target.game.value)
                    .then(response => {
                        if(response.ok) {
                            setLoading(false);
                            setPage({ curr: 1, start: 0, end: 10 });
                            return response.json();
                        }
                    }).catch(err => {
                        console.log(err);
                    });

        if (results.length) {
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                searchResults: results
            });
        }
    }

    const handleSubmit = (event) => {
        if(Auth.loggedIn()) {
            if (event.target.agree.checked) {
                console.log(sellPost);
                setErrorMessage('');
            } else {
                setErrorMessage('You must agree to our terms.');
            }
        } else {
            setErrorMessage(`You must be logged in to make a posting.`);
        }
    }

    const handlePageChange = (event, { activePage }) => {
        console.log(activePage, 'start: ', (activePage - 1) * 10, 'end:', activePage * 10 - 1);
        setPage({ curr: activePage, start: (activePage - 1) * 10, end: activePage * 10 })
    }

    const calcIndex = (index) => {
        console.log("map index:", index, "array index: ", (index) + ((page.curr - 1) * 10));
        return (index + ((page.curr - 1) * 10));
    }

    return (
        <>
            <Grid columns='equal'>
                <Grid.Row>
                    <SearchBox onSubmit={handleSearch} />
                </Grid.Row>
                <Grid.Row>
                    <Grid>
                        { loading ?
                            <Grid.Row>
                                <Loader active inline centered />
                            </Grid.Row>
                            :
                            ( searchResults.length > 0 ?
                                <div>
                                    {searchResults.length > 10 &&
                                        <Grid.Row>
                                            <Pagination defaultActivePage={1} totalPages={Math.ceil(searchResults.length / 10)} onPageChange={handlePageChange}/>
                                        </Grid.Row>
                                    }
                                    <Grid.Row>
                                        <Card.Group itemsPerRow={2}>
                                            {searchResults.slice(page.start, page.end).map((game, i) => (
                                                <SellCard
                                                    game={game}
                                                    index={calcIndex(i)}
                                                    setSelectedGame={setSelectedGame}
                                                    setShowModal={setShowModal}
                                                    key={i}
                                                />
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
                            )
                        }
                    </Grid>
                </Grid.Row>
            </Grid>
            <SellModal
                showModal={showModal}
                setShowModal={setShowModal}
                game={selectedGame}
                onSubmit={handleSubmit}
                sellPost={sellPost}
                setSellPost={setSellPost}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default Sell