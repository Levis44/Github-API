const express = require("express");
const StarController = require("../controllers/StarController");

const starRoute = express.Router();

starRoute.post("/:repo_id/:user_id", StarController.store);
starRoute.get("/:repo_id", StarController.index);
starRoute.delete("/:repo_id/:user_id", StarController.delete);

module.exports = starRoute;
