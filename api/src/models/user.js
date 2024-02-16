const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MODELNAME = "user";

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    documentation: {
      description: "firstname",
    },
  },
  lastName: {
    type: String,
    documentation: {
      description: "lastname",
    },
  },
  email: {
    type: String,
    documentation: {
      description: "email",
    },
  },
  password: {
    type: String,
    select: false,
    documentation: {
      description: "password",
    },
  },
  birthdateAt: {
    type: Date,
    documentation: {
      description: "Date de naissance du volontaire",
    },
  },
  lastLoginAt: {
    type: Date,
    documentation: {
      description: "Date de dernière connexion",
    },
  },
  phone: {
    type: String,
    documentation: {
      description: "Numéro de télephone",
    },
  },
  role: {
    type: String,
    default: "user",
    enum: ["user"],
    documentation: {
      description: "role",
    },
  },
  avatar: {
    type: String,
    documentation: {
      description: "avatar",
    },
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "banned", "inactive"],
    documentation: { description: "status" },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

Schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  this.updatedAt = Date.now();
  return next();
});

Schema.methods.comparePassword = async function (p) {
  const user = await OBJ.findById(this._id).select("password");
  return bcrypt.compare(p, user.password || "");
};

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;
