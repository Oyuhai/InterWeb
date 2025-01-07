document.addEventListener("DOMContentLoaded", () => {
    // Get the student ID from localStorage to filter the ads
    const studentId = localStorage.getItem('userId');

    // If no student is logged in, redirect to the login page
    if (!studentId) {
        alert('Та эхлээд нэвтэрнэ үү!');
        window.location.href = './signInStud.html';
        return;
    }

    // Find corresponding <ul> elements for each category
    const approvedList = document.getElementById('approved-list');
    const pendingList = document.getElementById('pending-list');
    const notApprovedList = document.getElementById('not-approved-list');

    // Get all advertisement keys from localStorage
    const adKeys = Object.keys(localStorage).filter(key => key.startsWith('request-'));
    console.log(adKeys);


    // Iterate over each advertisement stored in localStorage
    adKeys.forEach(key => {
        const adData = JSON.parse(localStorage.getItem(key));
        console.log(adData);
        // Only render the ads for the logged-in student
        if (adData && adData.studentId === studentId) {
            const li = document.createElement('li');
            li.innerHTML = `
                <h5>${adData.profession}</h5>
                <p>${adData.company}</p>
                <p>${adData.formattedDate}</p>
            `;

            // Append the <li> to the correct list based on the status
            if (adData.status === 'approved') {
                approvedList.appendChild(li);
            } else if (adData.status === 'pending') {
                pendingList.appendChild(li);
            } else if (adData.status === 'notApproved') {
                notApprovedList.appendChild(li);
            }
        }
    });
});

// Event listener for handling dropdown toggling for profile image
document.getElementById('user-dropdown-toggle').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('active'); // Toggle the active state

    // Dynamically position the dropdown menu below the profile image
    const rect = event.target.getBoundingClientRect();
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
});

// Close dropdown when clicking outside of it
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('user-dropdown');
    const toggle = document.getElementById('user-dropdown-toggle');

    if (!dropdown.contains(event.target) && !toggle.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Function to handle logout
function handleLogout() {
    // Clear the login data from localStorage
    localStorage.removeItem('studentId');
    localStorage.removeItem('isLoggedIn');

    // Redirect to the login page
    window.location.href = "/pages/signInStud.html";
}

// Event listener for the logout button
document.getElementById("logout-button").addEventListener("click", handleLogout);
