const express = require("express");
const UserController = require("../controllers/UserController");

const userRoute = express.Router();

userRoute.post("/", UserController.store);

userRoute.get("/", UserController.index);
userRoute.get("/:user_id", UserController.getSpecificUser);

userRoute.delete("/:user_id", UserController.delete);
userRoute.put("/:user_id", UserController.change);

module.exports = userRoute;
