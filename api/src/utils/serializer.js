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

module.exports = {
  serializeUser,
  serializeAdmin,
};
