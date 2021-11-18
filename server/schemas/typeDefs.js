const { gql } = require('apollo-server-express');


const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  games: [Game]
}
  
type Game {
  _id: ID
  name: String
  cover: String
  rating: Int
  platform: String
  condition: String
  user: [User]
}

input GameInput {
  _id: ID
  name: String
  cover: String
  rating: Int
  platform: String
  condition: String
}

type Order {
  _id: ID
  orderDate: String
  games: [Game]
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
  addGame(input: GameInput): User
  removeGame(_id: ID): User
  addOrder(_id: ID): Order
  removeOrder(_id: ID): Order
}
`;


module.exports = typeDefs;