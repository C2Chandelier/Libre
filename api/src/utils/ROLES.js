function canViewAllUsers(actor) {
  return ["admin", "user"].includes(actor.role);
}
function canViewAllAdmins(actor) {
  return ["admin"].includes(actor.role);
}
function canCreateArticle(actor) {
  return !["banned"].includes(actor.status);
}
function canModifyArticle(actor,id) {
  if(["admin"].includes(actor.role) || actor._id === id){
    return true;
  }
  else return false
  }

module.exports = { canViewAllUsers, canViewAllAdmins,canCreateArticle, canModifyArticle };
