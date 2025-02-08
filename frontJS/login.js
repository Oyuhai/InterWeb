document.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default page reload

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const formData = {
        email,
        password
    };

    try {
        const response = await fetch("http://localhost:4000/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            // On successful login, redirect the user to the profile page
            alert("Login successful!");
            window.location.href = "/profile.html"; // Redirect to profile page (you can change this URL)
        } else {
            alert(data.error); // Display the error message
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});
