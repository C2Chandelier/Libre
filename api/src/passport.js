const passport = require("passport");
const Joi = require("joi");
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const { secret, APP_URL } = require("./config");

const User = require("./models/user");
const Admin = require("./models/admin");

function getToken(req) {
  let token = ExtractJwt.fromAuthHeaderWithScheme("JWT")(req);

  // * On first call after refresh, the token is only in the cookie
  if (!token) {
    token = req.cookies.jwt;
  }
  return token;
}

module.exports = function () {
  const opts = {};
  opts.jwtFromRequest = getToken;
  opts.secretOrKey = secret;

  passport.use(
    "user",
    new JwtStrategy(opts, async function (jwtPayload, done) {
      try {
        const { error, value } = Joi.object({
          _id: Joi.string().required(),
        }).validate({
          _id: jwtPayload._id,
        });
        if (error) return done(null, false);

        const user = await User.findOne(value);
        if (user) return done(null, user);
      } catch (error) {
        console.log(error);
      }
      return done(null, false);
    }),
  );
  passport.use(
    "admin",
    new JwtStrategy(opts, async function (jwtPayload, done) {
      try {
        const { error, value } = Joi.object({
          _id: Joi.string().required(),
        }).validate({
          _id: jwtPayload._id,
        });
        if (error) return done(null, false);

        const admin = await Admin.findOne(value);
        if (admin) return done(null, admin);
      } catch (error) {
        console.log(error);
      }
      return done(null, false);
    }),
  );
};
