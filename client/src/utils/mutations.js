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
  mutation addGame($addGame: String!) {
    addGame(aggGame: $addGame) {
      _id
      addGame
      createdAt
      username
      gameCount
      game {
        _id
      }
    }
  }
`;

export const REMOVE_GAME= gql`
  mutation removeGame($id: ID!) {
    removeGame(id: $id) {
      _id
      username
      gameCount {
        _id
        username
      }
    }
  }
`;
