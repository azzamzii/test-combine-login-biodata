const dbConfig = require("../config/database");
const mongoose = require("mongoose");
const { User, validate } = require("./user.model.js")(mongoose);

module.exports = {
  mongoose,
  url: dbConfig.url,
  bio: { User, validate },
};
