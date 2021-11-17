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

  type Order {
    _id: ID
    orderDate: String
    games: [Game]
  }

  type Query {
    me: User 
    users: [User]
    user(username: String!): User
    games(username: String): [Game]
    game(_id: ID!): Game
  }
`;


module.exports = typeDefs;