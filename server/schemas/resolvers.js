const { User, Game, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// sets up query functions and mutations for client side use
const resolvers = {
  Query: {
    // gets user data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__V -password")
          .populate("games")

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    //gets all games data 
    games: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Game.find(params).sort({ createdAt: -1 });
    },

    //get a Game by id
    game: async (parent, { _id }) => {
      return Game.findOne({ _id });
    },

    // gets all users
    users: async () => {
      const users = await User.find()
        .select("-__v -password")
        .populate({
          path: "games"
        });
      
      return users;
    },

    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("games");
    },
  },

  Mutation: {
    // adds user
    addUser: async (parent, args) => {
      const user = await User.create({ ...args });
      const token = signToken(user);

      return { token, user };
    },

    // logs in user
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

    // adds game to database
    addGame: async (parent, args, context) => {
      const game = await Game.create({ ...args })
        .then(dbGameData => {
          const user = User.findByIdAndUpdate(
            context.user._id,
            { $push: { games: dbGameData._id }},
            { new: true }
          );
          console.log(user);
          return user;
        });
    },

    // removes game from data base
    removeGame: async (parent, args, context) => {
      const user = await Order.findByIdAndUpdate(
        context.user._id,
        { $pull: { games: { bookId: args.gameId } } },
        { new: true }
      );
      return user;
    },

    // adds order to database
    addOrder: async (parent, { products }, context) => {
      const order = new Order({ products });

      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { orders: order } },
        { new: true });

      return order;
    },

    // removes order from database
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
