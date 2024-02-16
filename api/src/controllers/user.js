const express = require("express");
const router = express.Router();
const passport = require("passport");
const Joi = require("joi");
const UserModel = require("../models/user");
const { serializeUser } = require("../utils/serializer");
const AuthObject = require("../auth");
const UserAuth = new AuthObject(UserModel);
const { canViewAllUsers } = require("../utils/ROLES");
const { ERRORS } = require("../utils");

router.get("/", passport.authenticate(["user", "admin"], { session: false, failWithError: true }), async (req, res) => {
  try {
    if (!canViewAllUsers(req.user)) return res.status(403).send({ ok: false, code: ERRORS.OPERATION_UNAUTHORIZED });
    const data = await UserModel.find({ deletedAt: { $exists: false } });
    return res.status(200).send({ ok: true, data: data.map(serializeUser) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
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
    return res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
});

router.put("/:id/avatar", passport.authenticate(["user", "admin"], { session: false, failWithError: true }), async (req, res) => {
  try {
    const { error, value } = Joi.object({ id: Joi.string().required(), avatar: Joi.string().required() }).unknown().validate(
      {
        id: req.params.id,
        avatar: req.body.avatar,
      },
      { stripUnknown: true },
    );

    if (error) {
      capture(error);
      return res.status(400).send({ ok: false, code: ERRORS.INVALID_PARAMS });
    }
    const { id, avatar } = value;
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).send({ ok: false, code: ERRORS.NOT_FOUND });
    user.set({ avatar: avatar });
    await user.save({ fromUser: req.user });
    return res.status(200).send({ ok: true, data: serializeUser(user) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
});

module.exports = router;
