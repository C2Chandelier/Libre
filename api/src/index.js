require("dotenv").config();

const express = require("express");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./mongo");

const { PORT, APP_URL } = require("./config.js");

console.log("APP_URL", APP_URL);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:19006", credentials: true }));

app.use(passport.initialize());

app.use("/user", require("./controllers/user"));
app.use("/admin", require("./controllers/admin"));

require("./passport")();

app.listen(PORT, () => console.log("Listening on port " + PORT));
