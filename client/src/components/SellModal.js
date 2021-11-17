import React from "react";
import { Modal, Button, Image, Header, Form } from "semantic-ui-react";
import SellForm from './SellForm';

const SellModal = ({ showModal, setShowModal, game }) => {
    const { value } = "";

    return (
        (showModal && game.cover.url ?
            <Modal
                onClose={() => setShowModal(false)}
                onOpen={() => setShowModal(true)}
                open={showModal}
            >
                <Modal.Header>List a Game for Sale</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src={"https:" + game.cover.url} wrapped />
                    <Modal.Description>
                        <Header>{game.name}</Header>
                        <SellForm />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setShowModal(false)}>
                        Nope
                    </Button>
                    <Button
                        content="Yep, let's do it!"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => setShowModal(false)}
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