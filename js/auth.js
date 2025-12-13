const USER_KEY = "user";
const LOGIN_KEY = "isLoggedIn";
const NAME_KEY = "loggedInUser";

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function saveUser(userData) {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
}

export function loginUser(firstName) {
  localStorage.setItem(LOGIN_KEY, "true");
  localStorage.setItem(NAME_KEY, firstName);
}

export function logoutUser() {
  localStorage.removeItem(LOGIN_KEY);
  localStorage.removeItem(NAME_KEY);
}

export function isLoggedIn() {
  return localStorage.getItem(LOGIN_KEY) === "true";
}

export function getLoggedInName() {
  return localStorage.getItem(NAME_KEY);
}
