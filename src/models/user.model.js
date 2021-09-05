const mongoose = require("mongoose");
const tokens = require("../helpers/tokens");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    tokens: [
      {
        accessToken: {
          type: String,
          required: true,
        },
        accessTokenTime: {
          type: Number,
          required: true,
        },
        refreshToken: {
          type: String,
          required: true,
        },
        refreshTokenTime: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function generateAuthToken() {
  // Generates an access token and refresh token for the user
  const user = this;
  const accessToken = tokens.createAccessToken(user.uid);
  const refreshToken = tokens.createRefreshToken(user.uid);
  const token = {
    accessToken,
    accessTokenTime: 3600,
    refreshToken,
    refreshTokenTime: 604800,
  };
  user.tokens.push(token);
  await user.save();
  return token;
};

userSchema.methods.refreshAccessToken = async (refreshToken) => {
  // Search for a user by uid
  const { uid } = tokens.decodeRefreshToken(refreshToken);
  const user = await User.findOne({
    uid,
    "tokens.refreshToken": refreshToken,
  });
  if (!user) {
    throw new Error({ message: "User Not found" });
  }
  const index = tokens.findRefreshToken(user, refreshToken);
  if (index === -1) {
    throw new Error({
      message: "Refresh token doesn't exist Suddenly but how",
    });
  }
  const accessToken = tokens.createAccessToken(uid);
  user.tokens[index].accessToken = accessToken;
  await user.save();
  return user.tokens[index];
};

const User = mongoose.model("User", userSchema);

User.getUserDetails = (uid) => User.find({ uid: uid }).then((user) => user[0]);

User.addUser = (uid, password) =>
  User.create({ uid: uid, password: password }).then((user) => user);

User.changePw = (uid, password) =>
  User.findOneAndUpdate(
    { uid: uid },
    { password: password },
    { new: true }
  ).then((user) => user);

User.clearTokens = (uid) =>
  User.findOneAndUpdate({ uid: uid }, { tokens: [] }, { new: true }).then(
    (user) => user
  );

User.clearToken = (uid, accessToken) =>
  User.updateMany(
    { uid: uid },
    { $pull: { tokens: { accessToken: accessToken } } },
    { multi: true }
  ).then((user) => user);

module.exports = User;
