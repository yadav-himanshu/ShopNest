document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Collect form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    // Form validation
    if (password !== repeatPassword) {
        alert('Passwords do not match!');
        return;
    }

    const userData = {
        firstName,
        lastName,
        email,
        password
    };

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData)

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', firstName);

    window.location.href = "index.html";

    // Redirect to the main page after successful signup
});
