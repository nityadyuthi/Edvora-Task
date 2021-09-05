const express = require("express");

const {
  registerUserController,
  loginUserController,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/register",  registerUserController);
router.post("/login", loginUserController);

module.exports = router;
