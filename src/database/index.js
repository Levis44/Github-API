const Sequelize = require("sequelize");

const User = require("../models/User");
const Repository = require("../models/Repository");
const Token = require("../models/Token");
const Follower = require("../models/Follower");
const Star = require("../models/Star");

const dotenv = require("dotenv");

dotenv.config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_NAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,

    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

User.init(connection);
Repository.init(connection);
Token.init(connection);
Follower.init(connection);
Star.init(connection);

User.associate(connection.models);
Repository.associate(connection.models);
Follower.associate(connection.models);
Star.associate(connection.models);

module.exports = connection;
