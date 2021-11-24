import React from "react";
import { Modal, Button, Image, Header } from "semantic-ui-react";
import SellForm from './SellForm';

// function that takes in modal info and return a componet
const SellModal = ({ showModal, setShowModal, game, onSubmit, sellPost, setSellPost, errorMessage }) => {

    // sell model to be displayed
    return (
        (showModal && game.cover.url ?
            <Modal
                onClose={() => setShowModal(false)}
                onOpen={() => setShowModal(true)}
                closeOnDimmerClick={false}
                dimmer='blurring'
                open={showModal}
            >
                <Modal.Header>List a Game for Sale</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src={"https:" + game.cover.url} wrapped />
                    <Modal.Description>
                        <Header>{game.name}</Header>
                        <SellForm onSubmit={onSubmit} game={game} sellPost={sellPost} setSellPost={setSellPost} errorMessage={errorMessage}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setShowModal(false)}>
                        Nope
                    </Button>
                    <input
                        form='sell-form'
                        type='submit'
                        className="ui button positive"
                    />
                </Modal.Actions>
            </Modal>
            :
            <>
            </>
        )
    )
}

export default SellModal