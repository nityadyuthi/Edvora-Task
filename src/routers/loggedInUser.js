const express = require("express");

const {
  getUserController,
  changePasswordController,
  logoutController,
} = require("../controllers/UserController");
const { userAuth } = require("../middleware/auth");

const router = express.Router();
router.use(userAuth);

router.get("/", getUserController);
router.patch("/", changePasswordController);
router.post("/", logoutController);

module.exports = router;
