document.getElementById('login-form').addEventListener('submit', handleLogin);//submit deer darahad handleLogin funkts ajillana

async function handleLogin(event) {
    event.preventDefault();//default http huselt shig shiidverlehees segiilj js uildliig heregjuulne

    let usersData;
    try {
        const response = await fetch('../login.json');//login jsonii medeelliig avna
        //medeelel tatahad aldaa garval error msg ogno
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        usersData = await response.json();
    } catch (error) {
        console.error("Error fetching login data:", error);
        alert("Unable to load login data. Please try again later.");
        return;
    }
    //trim() ashiglaj iluu dutuu zaig arilgana
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const user = usersData.find(u => u.email === email);//userdata dahi mail formiin mailtei ijilhen baigaa esehiig shalgana. olson ehnii utgiig butsaana

    if (user && user.password === password) {//user deerh password json passwortoi taarj baigaa esehiig shalgana

        localStorage.setItem('userId', user.userId);//localstoraged user id bolon nevtresen esehiig temdeglene
        localStorage.setItem('isLoggedIn', 'true');

        if (user.type === 'student') {
            window.location.href = "../pages/studprofile.html";
        } else if (user.type === 'hr') {
            window.location.href = "../pages/HRprofile.html";
        }
    } else {
        alert("Invalid email or password.");
    }
}

function handleLogout() {

    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');

    window.location.href = "../pages/signInStud.html";
}


window.onload = function () {//page deerh buh zurag text buh zuil loaded bolsnii daraa heregjih funkts todorhoilosn
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    //nevtersen baival garah tovchiig haruulna
    if (isLoggedIn === 'true') {
        document.getElementById('logout-button').style.display = 'block';
    } else {
        document.getElementById('logout-button').style.display = 'none';
    }
    //garah tovch daragdsan uyd handleLogout funkts ajillana
    document.getElementById("logout-button").addEventListener("click", handleLogout);

}


