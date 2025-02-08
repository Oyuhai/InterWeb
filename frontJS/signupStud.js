document.querySelector("#signupForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default page reload
    console.log("Form submitted!");  // Check if the event is firing

    const formData = {
        email: document.querySelector("#email").value,
        firstName: document.querySelector("input[name='firstName']").value,
        lastName: document.querySelector("input[name='lastName']").value,
        address: document.querySelector("input[name='home address']").value,
        jobTitle: document.querySelector("input[name='school job title']").value,
        password: document.querySelector("#password").value,
    };

    try {
        console.log("Sending request to server with data:", formData); // Log the data being sent
        const response = await fetch("http://localhost:4000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        console.log("Response status:", response.status);  // Log the response status

        if (!response.ok) {
            // Log response body when not OK
            const data = await response.json();
            console.log("Error response from server:", data);
            alert(data.error);  // Alert the user if there's an error
        } else {
            // Log successful response
            const data = await response.json();
            console.log("Signup successful:", data);
            alert("Signup successful!");
            window.location.href = "/signInStud"; // Redirect to login page
        }
    } catch (error) {
        // Log any network or unexpected error
        console.error("Error in request:", error);
        alert("Signup failed! Please try again.");
    }
});
