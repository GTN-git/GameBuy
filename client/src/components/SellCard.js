import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { getYear } from '../utils/helpers';
import { useSelector } from 'react-redux';

const SellCard = ({game, index, setSelectedGame, setShowModal}) => {
    const state = useSelector(state => state);

    const cardColors = (rating) => {
        switch (true) {
            case rating <= 25: return 'red';
            case rating <= 50: return 'yellow';
            case rating <= 75: return 'blue';
            case rating >= 76: return 'green';
            default: return 'green';
        }
    }

    const saveGame = event => {
        setSelectedGame(state.searchResults[event.target.value]);
        setShowModal(true);
    }

    return (
        <Card color={cardColors(Math.round(game.rating))} fluid>
            <Card.Content>
                <Image src={"https:" + game.cover.url} alt={game.name} floated="right" size="small" />
                <Card.Header>{game.name}</Card.Header>
                <Card.Meta>Released: {getYear(game.first_release_date)}</Card.Meta>
                <Card.Meta>User Ratings: {Math.round(game.rating)} / 100</Card.Meta>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green' onClick={saveGame} value={index}>
                            Sell this game!
                        </Button>
                    </div>
                </Card.Content>
            </Card.Content>
        </Card>
    );
}

export default SellCard
