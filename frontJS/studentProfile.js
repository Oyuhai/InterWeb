document.addEventListener("DOMContentLoaded", () => {//DOM-n elementuud achaallaj duussnii daraa sonsoh trigger, zurag, styleshet zereg gadnii resource duudagdahaas omno gsn ug
    const studentId = localStorage.getItem('userId');

    if (!studentId) {
        alert('Та эхлээд нэвтэрнэ үү!');
        window.location.href = './signInStud.html';
        return;
    }

    const approvedList = document.getElementById('approved-list');
    const pendingList = document.getElementById('pending-list');
    const notApprovedList = document.getElementById('not-approved-list');
    //object.keys(localStorage) local storage deh buh keyg avna
    //key dotroos request--r ehelsen buh keyg shuuj avna
    const adKeys = Object.keys(localStorage).filter(key => key.startsWith('request-'));
    console.log(adKeys);

    adKeys.forEach(key => {
        //key dotorh medeelliig avch  JSON string into a JavaScript object
        const adData = JSON.parse(localStorage.getItem(key));
        //nevterch orson suragchtai adil id-tai suragchiin medeelliig olno
        if (adData && adData.studentId === studentId) {
            const li = document.createElement('li');
            li.innerHTML = `
                <h5>${adData.profession}</h5>
                <p>${adData.company}</p>
                <p>${adData.formattedDate}</p>
            `;
            //taarsan statustai egneenii door bichne
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

document.getElementById('user-dropdown-toggle').addEventListener('click', function (event) {
    event.preventDefault();
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('active');
    const rect = event.target.getBoundingClientRect();
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
});

document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('user-dropdown');
    const toggle = document.getElementById('user-dropdown-toggle');

    if (!dropdown.contains(event.target) && !toggle.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

function handleLogout() {
    localStorage.removeItem('studentId');
    localStorage.removeItem('isLoggedIn');
    window.location.href = "/pages/signInStud.html";
}

document.getElementById("logout-button").addEventListener("click", handleLogout);

async function fetchProfile() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Please log in first.');
        window.location.href = './signInStud.html';
        return;
    }

    console.log('Fetching profile for userId:', userId);  // Log the userId to ensure it's correct

    try {
        const response = await fetch(`http://localhost:4000/api/auth/profile?userId=${userId}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }

        const profileData = await response.json();
        console.log('Received profile data:', profileData);
        renderProfile(profileData);
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching profile data');
    }
}


function renderProfile(data) {
    document.querySelector('#profile-name').innerText = data.full_name; // Adjust according to your data structure
    document.querySelector('#profile-email').innerText = data.email;
    document.querySelector('#profile-job-title').innerText = data.jobTitle;
    document.querySelector('#profile-address').innerText = data.address;
}

fetchProfile();

