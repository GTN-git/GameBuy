const { User, Game, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__V -password")
          .populate("games")

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    games: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Game.find(params).sort({ createdAt: -1 });
    },

    //get a Game by id
    game: async (parent, { _id }) => {
      return Game.findOne({ _id });
    },

    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("games");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("games");
    },
  },
};

module.exports = resolvers;
