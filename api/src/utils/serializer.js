const { isUser, isAdmin } = require(".");

function serializeUser(user) {
  return user.toObject({
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    },
  });
}

function serializeAdmin(admin) {
  return admin.toObject({
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    },
  });
}

function serializeArticle(article, user) {
  return article.toObject({
    transform: (_doc, ret) => {
      if (isUser(user)) {
        delete ret.updatedAt.by;
      }
      return ret;
    },
  });
}

module.exports = {
  serializeUser,
  serializeAdmin,
  serializeArticle,
};
