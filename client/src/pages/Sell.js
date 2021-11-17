import React, { Component } from 'react'
import { Form, Search, Grid, Header, Segment } from 'semantic-ui-react'
import _ from 'lodash'
import { searchGames } from '../utils/API'
// import faker from 'faker'


const source = _.times(5, (query) => ({
  title: "Hello",
  description: "World",
  image: "/img/something.jpg",
  price: "200",
}))

const initialState = { isLoading: false, results: [], value: '' }

class SearchBox extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
        <Search
            fluid
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 1500, {
                leading: true,
            })}
            results={results}
            value={value}
        />
    )
  }
}

const Sell = () => (
  <Form>
    <SearchBox />
    <Form.Input
      error='Please enter a description.'
      fluid
      label='Description'
      placeholder='This game is the best!'
    />
    <Form.Checkbox
      label='I agree to the Terms and Conditions'
      error={{
        content: 'You must agree to the terms and conditions',
        pointing: 'left',
      }}
    />
  </Form>
)

export default Sell