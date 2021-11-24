const { gql } = require('apollo-server-express');

// sets up graphql queries and objects
const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  gameCount: Int
  orderCount: Int
  games: [Game]
}
  
type Game {
  _id: ID
  name: String
  cover: String
  rating: Float
  release_date: Int
  platform: String
  condition: String
  price: Int
  seller: String
}

input GameInput {
  gameId: String
  name: String
  cover: String
  rating: Float
  platform: String
  condition: String
}

type Order {
  _id: ID
  orderDate: String
  orders: [Order]
}

type Auth{
  token: ID!
  user: User
}

type Query {
  me: User 
  users: [User]
  user(username: String!): User
  games(username: String): [Game]
  game(_id: ID!): Game
}

type Mutation{
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addGame(name: String!, cover: String!, rating: Float!, release_date: Int!, condition: String!, price: Int!, seller: String!): User
  removeGame(gameId: String): User
  addOrder(_id: ID): Order
  removeOrder(_id: ID): Order
}
`;


module.exports = typeDefs;