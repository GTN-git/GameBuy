const mongoose = require('mongoose');

// sets up connection to mongoose db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gamebuy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
