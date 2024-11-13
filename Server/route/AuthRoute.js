const express = require("express");
const Route = express.Router();
const { login, Register } = require("../controller/Auth");

Route.post("/login", login);
Route.post("/Register", Register);

module.exports = Route;
