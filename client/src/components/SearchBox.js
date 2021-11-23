import React, { Component } from "react";
import { Form } from 'semantic-ui-react';

class SearchBox extends Component {
    render() {
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Form.Field>
                    <label>Game Title</label>
                    <div className="ui action input">
                        <input type="text" placeholder='Search for a game...' name='game' required />
                        <button className="ui button">Search</button>
                    </div>
                </Form.Field>
            </Form>
        )
    }
}

export default SearchBox