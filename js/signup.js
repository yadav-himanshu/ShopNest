import { saveUser, loginUser } from "./auth.js";

document.getElementById("signupForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;

  if (password !== repeatPassword) {
    alert("Passwords do not match!");
    return;
  }

  const userData = { firstName, lastName, email, password };
  saveUser(userData);

  loginUser(firstName);
  window.location.href = "index.html";
});
