const express = require("express");
const RepositoryController = require("../controllers/RepositoryController");

const repoRoute = express.Router();

repoRoute.post("/:user_id", RepositoryController.store);
// FALTA AS STARS
repoRoute.get("/:user_id", RepositoryController.index);

repoRoute.get("/repo/:repo_id", RepositoryController.getSpecificRepo);

repoRoute.delete("/:repo_id", RepositoryController.delete);
repoRoute.put("/:repo_id", RepositoryController.change);

module.exports = repoRoute;
