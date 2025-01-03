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
