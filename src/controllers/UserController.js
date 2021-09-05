const {
  successResponseWithData,
  unauthorizedResponse,
  validationErrorResponse,
} = require("../helpers/response");
const { createPermissionError } = require("../helpers/errors");

let User = require("../models/user.model");

// user section
module.exports.loginUserController = [
  async (req, res) => {
    try {
      const { uid, password } = req.body;
      const user = await User.getUserDetails(uid);
      if (user.password !== password) {
        throw createPermissionError(
          "user_password_mismatch",
          "User password does not match"
        );
      }
      // user.password = undefined;
      user.tokens = await user.generateAuthToken();
      successResponseWithData(res, user);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];

module.exports.registerUserController = [
  async (req, res) => {
    try {
      const { uid, password } = req.body;
      const res_message = await User.addUser(uid, password);
      console.log(res_message);
      if (res_message == undefined) {
        throw createPermissionError("400", "User could not be added");
      }
      successResponseWithData(res, res_message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.getUserController = [
  async (req, res) => {
    try {
      const user = await User.getUserDetails(req.user.uid);

      if (user == undefined) {
        throw createPermissionError("400", "User does not exist");
      }
      user.password = undefined; // to send without pw
      successResponseWithData(res, user);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];

module.exports.changePasswordController = [
  async (req, res) => {
    try {
      const user = await User.getUserDetails(req.user.uid);
      if (user == undefined) {
        throw createPermissionError("400", "User does not exist");
      }
      const { password } = req.body;
      const res_message = await User.changePw(req.user.uid, password);
      if (res_message == undefined) {
        throw createPermissionError("400", "User could not be updated");
      }
      const res_message_2 = await User.clearTokens(req.user.uid);
      successResponseWithData(res, res_message);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];

module.exports.logoutController = [
  async (req, res) => {
    try {
      const user = await User.getUserDetails(req.user.uid);
      if (user == undefined) {
        throw createPermissionError("400", "User does not exist");
      }
      const res_message = await User.clearToken(req.user.uid, req.token);
      var res_message_1 = "Error!";
      if (res_message.modifiedCount == 1) {
        res_message_1 = "Logged Out!";
      }
      successResponseWithData(res, res_message_1);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];
