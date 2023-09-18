const express = require("express");
const router = express.Router();
const passport = require("passport");
const Joi = require("joi");
const UserModel = require("../models/user");
const { serializeUser } = require("../utils/serializer");
const AuthObject = require("../auth");
const UserAuth = new AuthObject(UserModel);
const { canViewAllUsers } = require("../lib/ROLES");

router.get("/", passport.authenticate("user", { session: false, failWithError: true }), async (req, res) => {
  try {
    if (!canViewAllUsers(req.user)) return res.status(403).send({ ok: false, code: "OPERATION_UNAUTHORIZED" });
    const data = await UserModel.find({ deletedAt: { $exists: false } });
    return res.status(200).send({ ok: true, data: data.map(serializeUser) });
  } catch (error) {
    res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

router.post("/signin", (req, res) => UserAuth.signin(req, res));

router.get("/signin_token", passport.authenticate("user", { session: false, failWithError: true }), (req, res) => UserAuth.signinToken(req, res));

router.post("/signup", async (req, res) => {
  UserAuth.signUp(req, res);
});

router.post("/logout", passport.authenticate("user", { session: false, failWithError: true }), async (req, res) => {
  try {
    await UserAuth.logout(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

module.exports = router;
