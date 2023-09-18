function canViewAllUsers(actor) {
  return ["admin", "user"].includes(actor.role);
}
function canViewAllAdmins(actor) {
  return ["admin"].includes(actor.role);
}

module.exports = { canViewAllUsers, canViewAllAdmins };
