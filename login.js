// Handle the login logic in the async function
async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    // Fetch the students data from the JSON file (async call)
    const studentsData = await fetch('../login.json')
        .then((response) => response.json()) // Wait until the data is available

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Find the student with the matching email
    const student = studentsData.find(s => s.email === email);

    if (student && student.password === password) {
        // Login successful, store the studentId in localStorage and set isLoggedIn flag
        localStorage.setItem('studentId', student.studentId);
        localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn flag to 'true'

        // Redirect to student profile (or dashboard)
        window.location.href = "/pages/studprofile.html"; // Replace with the actual URL of the student profile page
    } else {
        alert("Invalid email or password.");
    }
}
// Handle logout
function handleLogout() {
    // Clear the login data from localStorage
    localStorage.removeItem('studentId');
    localStorage.removeItem('isLoggedIn');

    // Redirect to login page or homepage
    window.location.href = "/pages/login.html"; // Replace with the actual login page URL
}

// Attach the event listener to the logout button
document.getElementById("logout-button").addEventListener("click", handleLogout);


// Attach the event listener to the form
document.getElementById("login-form").addEventListener("submit", handleLogin);


