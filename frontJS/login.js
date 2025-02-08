document.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

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
                "Content-Type": "application/json" //json data yvuulna
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Амжилттай нэвтэрлээ");
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('isLoggedIn', "true");
            window.location.href = "/studprofile";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.log("Алдаа", error);
        alert("Алдаа гарлаа. Дахин оролдоно уу");
    }
});
