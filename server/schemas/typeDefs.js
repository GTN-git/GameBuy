const { gql } = require('apollo-server-express');


const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    games: [Games]
    friends: [User]
  }
  
type Game {
    _id: ID
    name: String
    cover: String
    rating: int
    platform: string
    condition: string
    user: [User]
  }

  type Order {
    _id: ID
    orderDate: Date
    games: [Game]
  }

  type Query {
    me: User 
    users: [User]
    user(username: String!): User
    games(username: String): [Games]
    Games(_id: ID!): Games
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGames(name: String!): Game
    addFriend(friendId: ID!): User  
  }

  type Auth {
    token: ID!
    user: User
  }
`;


module.exports = typeDefs;