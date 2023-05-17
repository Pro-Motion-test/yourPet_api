const mongoose = require('mongoose');
const { DB_URI } = require('../config');
const connectToDatabase = async () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectToDatabase;
