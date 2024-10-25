document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    console.log('Form submitted');


    // Collect form data
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    console.log(`Email: ${email}, Password: ${password}`);


    // Retrieve user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    console.log('Stored user data:', storedUserData);

    // Check if user exists and validate credentials
    if (storedUserData) {
        if (storedUserData.email === email && storedUserData.password === password) {
            alert('Login successful!'); 

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', storedUserData.firstName);

            window.location.href = "index.html"; 
        } else {
            alert('Invalid email or password!'); 
        }
    } else {
        alert('No user found. Please sign up first.');
    }
});
