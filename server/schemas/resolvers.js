const { User, Game, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products').execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
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

    removeGame: async (parent, args, context) => {
      const user = await Order.findByIdAndUpdate(
        context.user._id,
        { $pull: { games: { bookId: args.gameId } } },
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
