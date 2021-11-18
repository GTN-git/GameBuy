import React from "react";
import { Modal, Button, Image, Header } from "semantic-ui-react";
import SellForm from './SellForm';

const SellModal = ({ showModal, setShowModal, game, onClick, setSale }) => {
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
                        <SellForm game={game} onClick={onClick} setSale={setSale}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setShowModal(false)}>
                        Nope
                    </Button>
                    <Button
                        form='sell-form'
                        content="Yep, let's do it!"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => onClick()}
                        positive
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