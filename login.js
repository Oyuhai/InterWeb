document.getElementById('login-form').addEventListener('submit', handleLogin);


async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    let studentsData;
    try {
        // Fetch the students data from the JSON file
        const response = await fetch('../login.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        studentsData = await response.json();
    } catch (error) {
        console.error("Error fetching login data:", error);
        alert("Unable to load login data. Please try again later.");
        return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Find the student with the matching email
    const student = studentsData.find(s => s.email === email);

    if (student && student.password === password) {
        // Login successful, store the studentId in localStorage and set isLoggedIn flag
        localStorage.setItem('studentId', student.studentId);
        localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn flag to 'true'

        // Redirect to student profile (or dashboard)
        window.location.href = "/pages/studprofile.html";
    } else {
        alert("Invalid email or password.");
    }
}

// // Handle logout
// function handleLogout() {
//     // Clear the login data from localStorage
//     localStorage.removeItem('studentId');
//     localStorage.removeItem('isLoggedIn');

//     // Redirect to login page or homepage
//     window.location.href = "/pages/login.html"; // Replace with the actual login page URL
// }

// // Attach the event listener to the logout button
// document.getElementById("logout-button").addEventListener("click", handleLogout);


// // Attach the event listener to the form
// document.getElementById("login-form").addEventListener("submit", handleLogin);


// Хуудас ачаалагдах үед хэрэглэгчийн нэвтэрсэн эсэхийг шалгах
window.onload = function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        // Хэрэглэгч нэвтэрсэн бол гарч явах товчийг харуулах
        document.getElementById('logout-button').style.display = 'block';
    } else {
        // Хэрэглэгч нэвтээгүй бол гарч явах товчийг нуух
        document.getElementById('logout-button').style.display = 'none';
    }
}



