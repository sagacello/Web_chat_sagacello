require('dotenv/config');

const { MongoClient } = require('mongodb');

const { DB_URL, DB_NAME } = process.env;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connection = () =>
  MongoClient.connect(DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {
      console.error(error.message);
      process.exit();
    });
module.exports = connection;