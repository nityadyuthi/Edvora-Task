const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const response = require("../helpers/response");
const constants = require("../helpers/constants");
const tokens = require("../helpers/tokens");

const findUser = async (req) => {
  const accessToken = req
    .header(constants.authorizationHeaderName)
    .replace(constants.bearerTokenLabel, "");
  const { id }   = tokens.decodeAccessToken(accessToken);
  return User.findOne({ uid: id, "tokens.accessToken": accessToken });
};

module.exports.userAuth = async (req, res, next) => {
  try {
    const user = await findUser(req);
    if (!user) {
      throw new Error("User not found");
    }
    user.tokens = undefined;
    user.password = undefined;
    req.user = user;
    req.token = req
    .header(constants.authorizationHeaderName)
    .replace(constants.bearerTokenLabel, "");
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.unauthorizedResponse(res, error);
      return;
    }
    response.forbiddenResponse(res, error);
  }
};
