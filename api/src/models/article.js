const mongoose = require("mongoose");
const MODELNAME = "article";

const File = new mongoose.Schema({
  _id: String,
  name: String,
  uploadedAt: Date,
  size: Number,
  mimetype: String,
  url: String,
});
const Schema = new mongoose.Schema({
  user_id: {
    type: String,
    documentation: {
      description: "id createur",
    },
  },
  theme: {
    type: String,
    documentation: {
      description: "theme",
    },
  },
  category: {
    type: String,
    documentation: {
      description: "categorie",
    },
  },
  title: {
    type: String,
    documentation: {
      description: "titre",
    },
  },
  image: {
    type: [File],
    documentation: {
      description: "fichier image",
    },
  },
  content: {
    type: String,
    documentation: {
      description: "contenu",
    },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: {
    date: { type: Date, default: Date.now },
    by: { type: Object,default:null },
  },
  deletedAt: { type: Date },
});

Schema.pre("save", function (next, params) {
  this.updatedAt.date = Date.now();
  this.updateat.by = params?.fromUser;
  next();
});

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;
