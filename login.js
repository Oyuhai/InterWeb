document.getElementById('login-form').addEventListener('submit', handleLogin);

async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    let usersData;
    try {
        // Fetch the users data (students or HR)
        const response = await fetch('../login.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        usersData = await response.json();
    } catch (error) {
        console.error("Error fetching login data:", error);
        alert("Unable to load login data. Please try again later.");
        return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Find the user (either student or HR) with the matching email
    const user = usersData.find(u => u.email === email);

    if (user && user.password === password) {
        // Login successful, store the userId in localStorage and set isLoggedIn flag
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn flag to 'true'

        // Redirect to appropriate page (either student profile or HR dashboard)
        if (user.type === 'student') {
            window.location.href = "/pages/studprofile.html";
        } else if (user.type === 'hr') {
            window.location.href = "/pages/HRprofile.html";
        }
    } else {
        alert("Invalid email or password.");
    }
}

function handleLogout() {
    // Clear the login data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');

    // Redirect to login page or homepage
    window.location.href = "/pages/signInHR.html"; // HR login page
}

// Хуудас ачаалагдах үед хэрэглэгчийн нэвтэрсэн эсэхийг шалгах
window.onload = function () {
    window.onload = function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
            // If logged in, show the logout button
            document.getElementById('logout-button').style.display = 'block';
        } else {
            // If not logged in, hide the logout button
            document.getElementById('logout-button').style.display = 'none';
        }
    }

    document.getElementById("logout-button").addEventListener("click", handleLogout);
}
