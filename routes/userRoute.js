const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");

route.post("/login", userController.login);

module.exports = route;
