enum NOTIFICATION {
  USER_ALREADY_EXISTS = 'You already have an account, please ',
  USER_DOESNT_EXIST = "This account doesn't exist, please ",
  SIGNUP_SUCCESS = 'Account has successfully created',
  LOGIN_SUCCESS = "You've been successfully logged in",
  LOGOUT_SUCCESS = "You've been successfully logged out",
  USER_ARE_NOT_AUTHORIZED = 'You are not authorized yet',
  WRONG_PASSWORD = "There's an issue with your email or password. Please, try again",
  URL_CHANGED = "Congratulations! You've successfully updated the URL",
  SAME_URL = "Oops! It looks like you've entered the same URL as before",
  NO_CHANGES_IN_EDITOR = 'Please update your input to provide new request',
}

export default NOTIFICATION;
