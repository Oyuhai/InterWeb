// JSON Data
const items = [
    {
        id: 1,
        profession: "Frontend Developer",
        location: "Chingeltei",
        duration: "4-6 months",
        company: "ICT",
        salary: 1300000,
        status: "open",
        image: "../pics/ictLogo.png",
        datePublished: "2024-12-02",
        dateSubmitted: "2024-12-15",
        approvalStatus: "approved"
    },
    {
        id: 2,
        profession: "Backend Developer",
        location: "Bayanzurkh",
        duration: "6-8 months",
        company: "TechCorp",
        salary: 1500000,
        status: "open",
        image: "../pics/techCorpLogo.png",
        datePublished: "2024-12-01",
        dateSubmitted: "2024-12-16",
        approvalStatus: "pending"
    },
    {
        id: 3,
        profession: "UI/UX Designer",
        location: "Sukhbaatar",
        duration: "3-6 months",
        company: "DesignStudio",
        salary: 1200000,
        status: "open",
        image: "../pics/designStudioLogo.png",
        datePublished: "2024-11-30",
        dateSubmitted: "2024-12-14",
        approvalStatus: "notApproved"
    }
];

// Helper function to find <ul> under <h3> with specific text
function findListByHeadingText(headingText) {
    const headings = document.querySelectorAll("article h3");
    for (let heading of headings) {
        if (heading.textContent.trim() === headingText) {
            return heading.nextElementSibling; // Return the <ul> after the <h3>
        }
    }
    return null; // Return null if no matching heading is found
}

// Populate the lists based on JSON data
document.addEventListener("DOMContentLoaded", () => {
    // Find the corresponding <ul> elements for each category
    const approvedList = findListByHeadingText("Зөвшөөрсөн");
    const pendingList = findListByHeadingText("Хүлээгдэж байгаа");
    const notApprovedList = findListByHeadingText("Татгалзсан");

    // Iterate over items and create <li> elements
    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h5>${item.profession}</h5>
            <p>${item.company}</p>
            <p>${item.dateSubmitted}</p>
        `;

        // Append the <li> to the correct list
        if (item.approvalStatus === "approved" && approvedList) {
            approvedList.appendChild(li);
        } else if (item.approvalStatus === "pending" && pendingList) {
            pendingList.appendChild(li);
        } else if (item.approvalStatus === "notApproved" && notApprovedList) {
            notApprovedList.appendChild(li);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Find corresponding <ul> elements for each category
    const approvedList = document.querySelector('.approved-list ul');
    const pendingList = document.querySelector('.pending-list ul');
    const notApprovedList = document.querySelector('.notApproved-list ul');

    // Iterate over items and create <li> elements
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h5>${item.profession}</h5>
            <p> ${item.company}</p>
            <p>${item.dateSubmitted}</p>
        `;

        // Append the <li> to the correct list based on approvalStatus
        if (item.approvalStatus === "approved") {
            approvedList.appendChild(li);
        } else if (item.approvalStatus === "pending") {
            pendingList.appendChild(li);
        } else if (item.approvalStatus === "notApproved") {
            notApprovedList.appendChild(li);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const headings = document.querySelectorAll("article h3");

    headings.forEach(heading => {
        heading.addEventListener("click", () => {
            const dropdown = heading.nextElementSibling; // .dropdown хэсгийг олно

            // Бүх нээлттэй dropdown-уудыг хаах
            document.querySelectorAll(".dropdown.open").forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove("open");
                }
            });

            // Өөрийн dropdown-ийг toggle хийнэ
            dropdown.classList.toggle("open");
        });
    });
});


// Add event listener to the profile image toggle
document.getElementById('user-dropdown-toggle').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default link behavior

    const dropdown = document.getElementById('user-dropdown');

    // Toggle the active state of the dropdown menu
    dropdown.classList.toggle('active');

    // Get the bounding rectangle of the clicked element
    const rect = event.target.getBoundingClientRect();

    // Dynamically position the dropdown directly below the profile image
    dropdown.style.left = `${rect.left}px`; // Align horizontally with the image
    dropdown.style.top = `${rect.bottom + window.scrollY}px`; // Align vertically below the image
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('user-dropdown');
    const toggle = document.getElementById('user-dropdown-toggle');

    // Check if the click is outside the dropdown and the toggle button
    if (!dropdown.contains(event.target) && !toggle.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});


function handleLogout() {
    // Логины өгөгдлийг localStorage-оос устгах
    localStorage.removeItem('studentId');
    localStorage.removeItem('isLoggedIn');

    // Гарч явах хуудсанд чиглүүлэх
    window.location.href = "/pages/signInStud.html"; // Логин хуудсанд шилжүүлэх
}

// Гарч явах товчийг сонсох
document.getElementById("logout-button").addEventListener("click", handleLogout);




