const mongoose = require("mongoose");

async function dbConnection() {
  var connection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/tanmay"
  );
  return connection;
}

module.exports = dbConnection;