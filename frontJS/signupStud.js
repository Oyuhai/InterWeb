document.querySelector("#signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("yu ch gsn signup form ilgeegdsn!");

    const formData = {
        email: document.querySelector("#email").value,
        firstName: document.querySelector("input[name='firstName']").value,
        lastName: document.querySelector("input[name='lastName']").value,
        address: document.querySelector("input[name='home address']").value,
        jobTitle: document.querySelector("input[name='school job title']").value,
        password: document.querySelector("#password").value,
    };

    try {
        console.log("server luu yavuulsan data:", formData);
        const response = await fetch("http://localhost:4000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const data = await response.json();
            console.log("Error response from server:", data);
            alert(data.error);
        } else {
            const data = await response.json();
            alert("Амжилттай бүртгүүллээ!");
            window.location.href = "/signInStud";
        }
    } catch (error) {
        alert("network prob");
    }
});
