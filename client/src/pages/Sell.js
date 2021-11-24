import React, { useState } from "react"
import {
  Card,
  Pagination,
  Grid,
  Loader,
  Dimmer,
  Divider,
  Container,
} from "semantic-ui-react"
import { searchGames } from "../utils/API"
import { useSelector, useDispatch } from "react-redux"
import { useMutation } from "@apollo/client"
import { UPDATE_SEARCH_RESULTS, UPDATE_SELL_PAGE } from "../utils/actions"
import SellCard from "../components/SellCard"
import SearchBox from "../components/SearchBox"
import SellModal from "../components/SellModal"
import Auth from "../utils/auth"
import { ADD_GAME } from "../utils/mutations"

// sell function that handles searching for games, and adds game to sale listing
// and returns sell component
const Sell = () => {
<<<<<<< HEAD

    // gets all necessary data and functions for sell
    const [state, dispatch] = [useSelector(state => state), useDispatch()];
    const [showModal, setShowModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState({});
    const [sellPost, setSellPost] = useState({ game: {}, user: {}, condition: 'poor', price: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { searchResults } = state;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({ curr: state.page, start: (state.page - 1) * 10, end: state.page * 10 });
    const [ addGame, { error }] = useMutation(ADD_GAME);

    // function that handles searching of the games
    const handleSearch = async (event) => {
        event.preventDefault();
=======
  const [state, dispatch] = [useSelector((state) => state), useDispatch()]
  const [showModal, setShowModal] = useState(false)
  const [selectedGame, setSelectedGame] = useState({})
  const [sellPost, setSellPost] = useState({
    game: {},
    user: {},
    condition: "poor",
    price: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { searchResults } = state
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState({
    curr: state.page,
    start: (state.page - 1) * 10,
    end: state.page * 10,
  })
  const [addGame] = useMutation(ADD_GAME)

  const handleSearch = async (event) => {
    event.preventDefault()
>>>>>>> 63131af543ee4c3d378fb7f33d1e9eaeaf5f2de2

    setLoading(true)
    const results = await searchGames(event.target.game.value)
      .then((response) => {
        if (response.ok) {
          setLoading(false)
          setPage({ curr: 1, start: 0, end: 10 })
          handlePageChange({}, { activePage: 1 })
          return response.json()
        }
      })
      .then((data) => {
        data = data.filter((game) => game.rating > 0)
        return data
      })
      .catch((err) => {
        console.log(err)
      })

    if (results.length) {
      try {
        dispatch({
          type: UPDATE_SEARCH_RESULTS,
          searchResults: results,
        });
      } catch (err) {
          setErrorMessage(err);
      }
    }
  }

    // funcstion that handles submitting of sell listing for the user
    const handleSubmit = async (event) => {
        if (Auth.loggedIn()) {
            if (event.target.agree.checked) {
                await addGame({ variables: {
                  ...sellPost.game,
                  release_date: sellPost.game.first_release_date,
                  cover: sellPost.game.cover.url,
                  price: sellPost.price,
                  condition: sellPost.condition,
                  seller: Auth.getProfile().data.username 
                }}).catch(err => {
                  setErrorMessage('Something went wrong creating');
                });

        await dispatch(
          {
            type: UPDATE_SELL_PAGE,
            page: 1,
          },
          {
            type: UPDATE_SEARCH_RESULTS,
            searchResults: [],
          }
        )

        window.location = "/"
      } else {
        setErrorMessage("You must agree to our terms.")
      }
    } else {
      setErrorMessage(`You must be logged in to make a posting.`)
    }
  }

<<<<<<< HEAD
    // updates page on change
    const handlePageChange = (event, { activePage }) => {
        setPage({ curr: activePage, start: (activePage - 1) * 10, end: activePage * 10 })
        dispatch({
            type: UPDATE_SELL_PAGE,
            page: activePage
        })
    }

    // generates index for items
    const calcIndex = (index) => {
        return (index + ((page.curr - 1) * 10));
    }

    // sell componet
    return (
        <Container>
            <Grid columns='equal'>
                <Grid.Column>
                    <Grid.Row>
                        <Container fluid>
                            <SearchBox onSubmit={handleSearch} />
                        </Container>
                    </Grid.Row>
                </Grid.Column>
=======
  const handlePageChange = (event, { activePage }) => {
    setPage({
      curr: activePage,
      start: (activePage - 1) * 10,
      end: activePage * 10,
    })
    dispatch({
      type: UPDATE_SELL_PAGE,
      page: activePage,
    })
  }

  const calcIndex = (index) => {
    return index + (page.curr - 1) * 10
  }

  return (
    <Container>
      <Grid columns="equal">
        <Grid.Column>
          <Grid.Row>
            <h1 className="Sell">How To Sell Your Items</h1>
            <div className="instructionMain">
              <Grid.Column>
                <div className="instructions">
                  <h2 className="Circle">1</h2>
                  Search for your game in our expansive Library!
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="instructions">
                  <h2 className="Circle">2</h2>
                  Click Sell game and set your condition and price
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="instructions">
                  <h2 className="Circle">3</h2>
                  Post and resale to your fellow Gamer!
                </div>
              </Grid.Column>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Container fluid>
              <SearchBox onSubmit={handleSearch} />
            </Container>
          </Grid.Row>
        </Grid.Column>
        <Grid.Row>
          <Grid>
            <div>
              <Dimmer active={loading} inverted size="massive">
                <Loader inverted>Loading...</Loader>
              </Dimmer>
              {searchResults.length > 0 || loading ? (
                <div className="ui center aligned container">
                  {searchResults.length > 10 && (
                    <>
                      <Grid.Row>
                        <Pagination
                          defaultActivePage={page.curr !== 1 && page.curr}
                          totalPages={Math.ceil(searchResults.length / 10)}
                          onPageChange={handlePageChange}
                        />
                      </Grid.Row>
                      <Divider />
                    </>
                  )}
                  <Grid.Row>
                    <Card.Group itemsPerRow={2}>
                      {searchResults
                        .slice(page.start, page.end)
                        .map((game, i) => (
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
              ) : (
>>>>>>> 63131af543ee4c3d378fb7f33d1e9eaeaf5f2de2
                <Grid.Row>
                  <h2><span role="img" aria-label="chicken">🐔</span> Nothing here but us chickens...</h2>
                </Grid.Row>
              )}
            </div>
          </Grid>
          <Divider />
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
    </Container>
  )
}

export default Sell
