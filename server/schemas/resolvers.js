const { User, Game, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');

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

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create({ ...args });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addGame: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { games: args.input } },
        { new: true }
      );
      return user;
    },

    removeGame: async (parent, args, context) => {
      const user = await Order.findByIdAndUpdate(
        context.user._id,
        { $pull: { games: { bookId: args.bookId } } },
        { new: true }
      );
      return user;
    },

    addOrder: async (parent, { products }, context) => {
      const order = new Order({ products });

      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { orders: order } },
        { new: true });

      return order;
    },

    removeOrder: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { games: { name: args.name } } },
        { new: true }
      );
      return user;
    },
  }
};

module.exports = resolvers;
