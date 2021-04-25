const express = require("express");

const userRoutes = require("./routes/UserRoutes");
const repoRoutes = require("./routes/RepositoryRoutes");
const tokenRoutes = require("./routes/TokenRoutes");
const followerRoutes = require("./routes/FollowerRoutes");
const starRoutes = require("./routes/StarRoutes");

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/repositories", repoRoutes);
routes.use("/tokens", tokenRoutes);
routes.use("/follows", followerRoutes);
routes.use("/stars", starRoutes);

module.exports = routes;
