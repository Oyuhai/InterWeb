const mydata = await fetch('/mydata.json')
    .then((response) => response.json());//irsen jsonoo js object bolgono

const professionDictionary = {
    backend_developer: "Backend Хөгжүүлэгч",
    system_analist: "Систем шинжээч",
    frontend_developer: "Frontend Хөгжүүлэгч",
    tuslah_engineer: "Туслах инженер",
    system_admin: "Системийн админ"
};

const locationDictionary = {
    bzd: "Баянзүрх дүүрэг",
    chd: "Чингэлтэй дүүрэг",
    hud: "Хан-Уул дүүрэг"
};

async function ActiveZarHAruulah() {
    const companyDictionary = {};
    //zar bolgonoor guin  compnay company-r bagtsalna
    mydata.forEach(zar => {
        if (companyDictionary[zar.company]) {
            companyDictionary[zar.company].push(zar);
        } else {
            companyDictionary[zar.company] = [zar];
        }
    });
    //ehnii key(company) deerh ehnii objectiin zurgiig avna. key dotorh busad neelttei objectuudiig(zar) haruulna
    const homePageCompany = Object.keys(companyDictionary).reduce((p, c) => {
        const imageUrl = companyDictionary[c][0].image;
        const companyHtml = `<article class="flex-col company">
                        <img src="${imageUrl}" alt="company logo">
                        <h4>${c}</h4>
                        <ul>
                            ${companyDictionary[c].reduce((p, c) => {
            if (c.status == "open")
                return p + `<li>${professionDictionary[c.profession]}</li>`;
            else return p;
        }, '')}
                        </ul>
                    </article>`;
        return p += companyHtml;
    }, '');

    const companyContainer = document.getElementById("companyHaruulah");
    companyContainer.innerHTML = homePageCompany;
    //ehleed company daraa in suuld nemegdsen zaruudiig gargana
    renderRecentItems();
}

function renderRecentItems() {
    //zar dotroo tavigdson ognoogoor erembleed ehnii 5 buyu suuld tavigdsn zaruudig avna
    const recentItems = mydata
        .filter(item => item.datePublished)
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
        .slice(0, 5);//0r indexeer ehleed 5 hurelgui zogsono

    const listContainer = document.getElementById('zarHaruulah');
    listContainer.innerHTML = recentItems.reduce((html, item) => {
        return html + `
            <li class="ad-container">
                <div>
                    <h4>${professionDictionary[item.profession]}</h4>
                    <p>${item.company}, ${locationDictionary[item.location]}</p>
                    <p>${item.salary.toLocaleString()}₮</p>
                </div>
                <div class="ad-container-bottom">
                    <p>${item.status === 'open' ? 'Нээлттэй' : 'Хаалттай'}</p>
                    <button class="request-btn" style="cursor: pointer;" data-status=${item.status} data-profession=${item.profession} data-company=${item.company} data-date=${item.datePublished}>Хүсэлт илгээх</button>
                    <button id="openPopup">Дэлгэрэнгүй</button>
                </div>
            </li>`;
    }, '');
    //suuld nemegdsen zaruudiig orsnii daraa event listener nemne
    attachRequestButtonListeners();
}

function attachRequestButtonListeners() {
    const requestButtons = document.querySelectorAll(".request-btn");
    console.log(`Found ${requestButtons.length} request buttons.`);

    requestButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            console.log('req button clicked');
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            console.log(`User   logged in: ${isLoggedIn}`);

            if (!isLoggedIn) {
                alert('Та эхлээд нэвтэрнэ үү!');
                window.location.href = './signInStud';
                return;
            }

            const statusZar = event.target.dataset.status;
            if (statusZar != "open") {
                alert('Зар хаагдсан байна!');
                return;
            }

            const profession = event.target.dataset.profession;
            const company = event.target.dataset.company;
            const studentId = localStorage.getItem('userId');

            const dateSec = new Date();
            const year = dateSec.getFullYear();
            const month = String(dateSec.getMonth() + 1).padStart(2, '0');
            const day = String(dateSec.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const adKey = `request-${profession}-${company}-${studentId}`;
            if (localStorage.getItem(adKey)) {
                alert('Та энэ зар дээр аль хэдийн хүсэлт илгээсэн байна!');
                return;
            }

            const adData = {
                profession,
                company,
                formattedDate,
                studentId,
                status: 'pending',
            };

            localStorage.setItem(adKey, JSON.stringify(adData));

            alert('Хүсэлт илгээгдлээ!');
        });
    });
}

ActiveZarHAruulah();

const isLoggedIn = localStorage.getItem('isLoggedIn');
const profileImage = document.getElementById('profileImage');

if (isLoggedIn) {
    profileImage.src = '/pics/profile.webp';
    profileImage.parentElement.href = './studprofile';
} else {
    profileImage.src = "/pics/profileIcon.png";
    profileImage.parentElement.href = "./signInStud";
}