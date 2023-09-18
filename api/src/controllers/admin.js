const express = require("express");
const router = express.Router();
const passport = require("passport");
const Joi = require("joi");
const AdminModel = require("../models/admin");
const { serializeAdmin } = require("../utils/serializer");
const AuthObject = require("../auth");
const AdminAuth = new AuthObject(AdminModel);
const { canViewAllAdmins } = require("../lib/ROLES");

router.get("/", passport.authenticate("admin", { session: false, failWithError: true }), async (req, res) => {
  try {
    //seul les modérateurs peuvent voir tous les admins
    if (!canViewAllAdmins(req.user)) return res.status(403).send({ ok: false, code: "OPERATION_UNAUTHORIZED" });
    const data = await AdminModel.find({ deletedAt: { $exists: false } });
    return res.status(200).send({ ok: true, data: data.map(serializeAdmin) });
  } catch (error) {
    res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

router.post("/signin", (req, res) => AdminAuth.signin(req, res));

router.get("/signin_token", passport.authenticate("admin", { session: false, failWithError: true }), (req, res) => AdminAuth.signinToken(req, res));

router.post("/signup", async (req, res) => {
  AdminAuth.signUp(req, res);
});

router.post("/logout", passport.authenticate("admin", { session: false, failWithError: true }), async (req, res) => {
  try {
    await AdminAuth.logout(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

module.exports = router;
