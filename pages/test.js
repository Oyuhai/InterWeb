document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const profileImage = document.getElementById('profileImage');
    const requestButton = document.getElementById('requestButton');

    if (isLoggedIn) {
        profileImage.src = '/pics/profile.webp';
        profileImage.parentElement.href = './studprofile.html';
    } else {
        profileImage.src = '/pics/profileIcon.png';
        profileImage.parentElement.href = './signInStud.html';
    }

    if (requestButton) {
        requestButton.addEventListener('click', function () {
            this.textContent = 'Хүсэлт илгээгдлээ';
            localStorage.setItem('requestStatus', 'pending');
            window.location.href = './studprofile.html';
        });
    }
});
