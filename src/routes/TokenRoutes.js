const express = require("express");
const TokenController = require("../controllers/TokenController");

const tokenRoute = express.Router();

tokenRoute.post("/:user_id", TokenController.store);
tokenRoute.get("/:user_id", TokenController.index);

module.exports = tokenRoute;
