const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { serializeAdmin, serializeUser } = require("./utils/serializer");
const config = require("./config");
const { isUser, isAdmin, cookieOptions } = require("./utils");
const { validateFirstName, validatePassword } = require("./utils/validator");

class Auth {
  constructor(model) {
    this.model = model;
  }

  async signin(req, res) {
    const { error, value } = Joi.object({
      email: Joi.string().lowercase().trim().email().required(),
      password: Joi.string().required(),
    })
      .unknown()
      .validate(req.body);
    if (error) return res.status(400).send({ ok: false, code: "EMAIL_AND_PASSWORD_REQUIRED" });
    const { password, email } = value;
    try {
      const user = await this.model.findOne({
        email: email,
        deletedAt: { $exists: false },
      });

      if (!user || user.status === "DELETED") return res.status(401).send({ ok: false, code: "EMAIL_OR_PASSWORD_INVALID" });

      const match = await user.comparePassword(password);
      if (!match) {
        return res.status(401).send({ ok: false, code: "EMAIL_OR_PASSWORD_INVALID" });
      }
      user.set({ lastLoginAt: Date.now() });
      await user.save();

      const MAX_TOKEN = 60 * 60 * 24 * 365 * 1000;
      const token = jwt.sign(
        {
          _id: user.id,
        },
        config.secret,
        { expiresIn: MAX_TOKEN },
      );
      res.cookie("jwt", token, cookieOptions(MAX_TOKEN));

      const data = isUser(user) ? serializeUser(user) : serializeAdmin(user);
      return res.status(200).send({
        ok: true,
        token,
        user: data,
        code: 'ok'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
    }
  }

  async signUp(req, res) {
    try {
      const { error, value } = Joi.object({
        email: Joi.string().lowercase().trim().email().required(),
        firstName: validateFirstName().trim().required(),
        lastName: Joi.string().uppercase().trim().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        birthdateAt: Joi.date().required(),
      }).validate(req.body);

      if (error) {
        if (error.details[0].path.find((e) => e === "email")) return res.status(400).send({ ok: false, user: null, code: "EMAIL_INVALID" });
        if (error.details[0].path.find((e) => e === "password"))
          return res.status(400).send({
            ok: false,
            user: null,
            code: "PASSWORD_NOT_VALIDATED",
          });
        console.log(error);
        return res.status(400).send({ ok: false, code: "INVALID_PARAMS" });
      }

      const { email, firstName, lastName, password, phone, birthdateAt } = value;
      if (!validatePassword(password))
        return res.status(400).send({
          ok: false,
          user: null,
          code: "PASSWORD_NOT_VALIDATED",
        });

      const formatedDate = birthdateAt;
      formatedDate.setUTCHours(11, 0, 0);

      let countDocuments = await this.model.countDocuments({
        email,
      });
      if (countDocuments > 0) return res.status(409).send({ ok: false, code: "USER_ALREADY_REGISTERED" });

      const user = await this.model.create({
        email,
        firstName,
        lastName,
        password,
        phone,
        birthdateAt: formatedDate,
      });
      const MAX_TOKEN = 60 * 60 * 24 * 365 * 1000;

      const token = jwt.sign({ _id: user.id }, config.secret, {
        expiresIn: MAX_TOKEN,
      });
      if (isUser(user)) res.cookie("jwt", token, cookieOptions(MAX_TOKEN));
      else if (isAdmin(user)) res.cookie("jwt", token, cookieOptions(MAX_TOKEN));

      return res.status(200).send({
        ok: true,
        token,
        user: serializeUser(user),
      });
    } catch (error) {
      console.log("Error ", error);
      if (error.code === 11000) return res.status(409).send({ ok: false, code: "USER_ALREADY_REGISTERED" });
      return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("jwt");
      return res.status(200).send({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ ok: false });
    }
  }

  async signinToken(req, res) {
    const tokenAccess = req.hostname === "localhost" ? req.cookies.jwt : req.headers.authorization.substring(4);
    const { error, value } = Joi.object({
      token: Joi.string(),
    }).validate({
      token: tokenAccess
    });
    if (error) return res.status(500).send({ ok: false, code: "SERVER_ERROR" });

    try {
      const { user } = req;
      const data = isUser(user) ? serializeUser(user, user) : serializeAdmin(user, user);
      const token = value.token;
      if (!data || !token) throw Error("PB with signin_token");
      res.send({ ok: true, token: token, user: data, data });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
    }
  }
}

module.exports = Auth;
