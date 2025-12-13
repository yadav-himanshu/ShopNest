import { getStoredUser, loginUser } from "./auth.js";

document.getElementById("loginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const user = getStoredUser();

  if (!user) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (user.email === email && user.password === password) {
    loginUser(user.firstName);
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password!");
  }
});
