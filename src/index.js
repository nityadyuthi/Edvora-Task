const express = require("express");
var bodyParser = require("body-parser");
const {userRouter, loggedInUserRouter} = require("./routers/router");

const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

require("./db/db");

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.use("/users", userRouter);
app.use("/loggedInUser", loggedInUserRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));