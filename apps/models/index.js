const dbConfig = require("../config/database");
const mongoose = require("mongoose");
const { User, validate } = require("./hewan.model.js")(mongoose);

module.exports = {
  mongoose,
  url: dbConfig.url,
  hewan: { User, validate },
};
