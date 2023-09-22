export function canViewAllUsers(actor) {
  return ["admin", "user"].includes(actor.role);
}
export function canViewAllAdmins(actor) {
  return ["admin"].includes(actor.role);
}
export function canCreateArticle(actor) {
  return !["banned"].includes(actor.status);
}
export function canModifyArticle(actor, id) {
  if (["admin"].includes(actor.role) || actor._id === id) {
    return true;
  } else return false;
}
