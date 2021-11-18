
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Gamebuy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  
  module.exports = mongoose.connection;