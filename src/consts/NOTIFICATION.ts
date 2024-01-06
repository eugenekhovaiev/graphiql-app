enum NOTIFICATION {
  USER_ALREADY_EXISTS = 'You already have an account, please ',
  USER_DOESNT_EXIST = "This account doesn't exist, please ",
  SIGNUP_SUCCESS = 'Account has successfully created',
  LOGIN_SUCCESS = "You've been successfully logged in",
  LOGOUT_SUCCESS = "You've been successfully logged out",
  USER_ALREADY_LOGGED_IN = "You've already logged in, enjoy GraphiQL",
  USER_ARE_NOT_AUTHORIZED = 'You are not authorized yet',
  WRONG_PASSWORD = "There's an issue with your email or password. Please, try again.",
  URL_CHANGED = "Congratulations! You've successfully updated the URL.",
}

export default NOTIFICATION;
