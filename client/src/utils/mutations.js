import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation addGame($name: String!, $cover: String!, $rating: Float!, $condition: String!, $price: Int!, $seller: String!) {
    addGame(name: $name, cover: $cover, rating: $rating, condition: $condition, price: $price, seller: $seller) {
      _id
      username
      email
      gameCount
      games {
        name
        cover
        rating
        platform
        condition
      }
    }
  }
`;


export const REMOVE_GAME= gql`
  mutation removeGame($gameId: String!) {
    removeGame(gameId: $gameId) {
      _id
      username
      games {
        gameId
      }
    }
  }
`;

export const ADD_ORDER= gql `
mutation addOrder($_id: ID) {
  addOrder(_id: $ID) {
    _id
    orderDate
    orders
    }
  }
`

export const REMOVE_ORDER= gql `
mutation removeOrder($_id: ID!) {
  removeOrder(_id: $ID) {
    _id
    orderDate
    orders
  }
}
`