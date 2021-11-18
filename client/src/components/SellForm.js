import React, { useState } from 'react'
import { Form, Input, Label } from 'semantic-ui-react'

const SellForm = ({game}) => {
    const [state, setState] = useState({game: game, condition: 'poor', price: ''})
    
    const handleChange = (e, { value }) => {
        // console.log(e.target === 'label');
        setState({condition: value});
    }

    const value = state.condition;
    return (
        <Form id='sell-form'>
            <Form.Group inline>
                <label>Condition:</label>
                <Form.Radio
                    label='Poor'
                    value='poor'
                    checked={value === 'poor'}
                    onChange={handleChange}
                />
                <Form.Radio
                    label='Fair'
                    value='fair'
                    checked={value === 'fair'}
                    onChange={handleChange}
                />
                <Form.Radio
                    label='Good'
                    value='good'
                    checked={value === 'good'}
                    onChange={handleChange}
                />
                <Form.Radio
                    label='Excellent'
                    value='excellent'
                    checked={value === 'excellent'}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Input labelPosition='right' type='text' placeholder='Amount' required>
                    <Label basic>$</Label>
                    <input />
                    <Label>.00</Label>
                </Input>
            </Form.Group>
            <Form.Checkbox label='I agree to the Terms and Conditions' required />
        </Form>
    )
}

export default SellForm