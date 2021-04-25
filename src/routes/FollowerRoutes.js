const express = require("express");
const FollowerController = require("../controllers/FollowerController");

const followerRoute = express.Router();

followerRoute.post("/:follower_id/:user_id", FollowerController.store);
followerRoute.delete("/:follower_id/:user_id", FollowerController.delete);
followerRoute.get("/:user_id", FollowerController.index);

module.exports = followerRoute;
