import React, { Component } from 'react'
import { Form, Input, Label } from 'semantic-ui-react'

class SellForm extends Component {
    state = {}

    handleChange = (e, { value }) => {
        this.setState({ value });
        console.log(value);
    }


    render() {
        const { value } = this.state
        return (
            <Form>
                <Form.Group inline>
                    <label>Condition:</label>
                    <Form.Radio
                        label='Poor'
                        value='pr'
                        checked={value === 'pr'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Fair'
                        value='fr'
                        checked={value === 'fr'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Good'
                        value='gd'
                        checked={value === 'gd'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Excellent'
                        value='ex'
                        checked={value === 'ex'}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Input labelPosition='right' type='text' placeholder='Amount'>
                        <Label basic>$</Label>
                        <input />
                        <Label>.00</Label>
                    </Input>
                </Form.Group>
                <Form.Checkbox label='I agree to the Terms and Conditions' />
            </Form>
        )
    }
}

export default SellForm