import * as Sentry from "@sentry/react";

export const authActions = {
  SETUSER: "SETUSER",
};

export function setUser(user) {
  if (user)
    Sentry.setUser({
      id: user._id,
      email: user.email,
      username: `${user.firstName} ${user.lastName}`,
    });
  else Sentry.setUser(null);
  return { type: authActions.SETUSER, user };
}