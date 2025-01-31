// Мэргэжлийн нэрсийн толь
const professionDictionary = {
    backend_developer: "Backend Хөгжүүлэгч",
    system_analist: "Систем шинжээч",
    frontend_developer: "Frontend Хөгжүүлэгч",
    tuslah_engineer: "Туслах инженер",
    system_admin: "Системийн админ"
};

// Зар мэдээллийг JSON хэлбэрээр авах
const mydata = await fetch('/mydata.json')
    .then((response) => response.json()); // JSON дата ирэхийг хүлээнэ

// Компаний заруудыг ангилах функц
async function ActiveZarHAruulah() {
    const companyDictionary = {}; // Компаниудыг хадгалах объект

    mydata.forEach(zar => {
        if (companyDictionary[zar.company]) {
            companyDictionary[zar.company].push(zar); // Хэрэв компанийн нэр байгаа бол шинэ зар нэмнэ
        } else {
            companyDictionary[zar.company] = [zar]; // Шинэ компани үүсгэнэ
        }
    });

    // Компанийн бүх мэдээллийг HTML-д оруулах
    const homePageCompany = Object.keys(companyDictionary).reduce((p, c) => {
        const imageUrl = companyDictionary[c][0].image; // Компаний зургийг авах
        const companyHtml = `<article class="flex-col company">
                            <img src="${imageUrl}" alt="company logo">
                            <h4>${c}</h4>
                            <ul>
                                ${companyDictionary[c].reduce((p, c, i) => {
            if (c.status == "open")
                return p + `<li>${professionDictionary[c.profession]}</li>`;
            return p;
        }, '')}
                            </ul>
                        </article>`;
        return p += companyHtml; // Компаниудын мэдээллийг нэмнэ
    }, '');

    // HTML-д компаниудыг гаргах
    const b = document.getElementById("companyHaruulah");
    b.innerHTML = homePageCompany;
}

// Сүүлийн 5 зарын мэдээллийг харуулах
const recentItems = mydata
    .filter(item => item.datePublished) // Огноо байгаа зарыг шүүж авна
    .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished)) // Огноогоор нь эрэмбэлнэ
    .slice(0, 5); // Дээд 5 зарыг авна

// HTML-д сүүлийн 5 зарын мэдээллийг оруулах
const listContainer = document.getElementById('zarHaruulah');
listContainer.innerHTML = recentItems.reduce((html, item) => {
    return html + `
        <li class="ad-container">
            <div>
                <h4>${item.profession}</h4>
                <p>Компани: ${item.company}, Байршил: ${item.location}</p>
                <p>${item.salary.toLocaleString()}₮</p>
            </div>
            <div class="ad-container-bottom">
                <p>${item.status === 'open' ? 'Нээлттэй' : 'Хаалттай'}</p>
                <button>Хүсэлт илгээх</button>
            </div>
        </li>`;
}, '');

// LocalStorage-д хүсэлтийг хадгалах функц
function saveRequestToPending(jobDetails) {
    const pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    pendingRequests.push(jobDetails);
    localStorage.setItem("pendingRequests", JSON.stringify(pendingRequests));
}

// Зарын хүсэлт илгээх
function sendJobRequest(jobId, jobTitle, jobLocation, jobDate) {
    const jobDetails = {
        id: jobId,
        title: jobTitle,
        location: jobLocation,
        date: jobDate,
    };

    saveRequestToPending(jobDetails);

    alert(`${jobTitle} зарын хүсэлт илгээгдлээ.`);
}

// StudProfile хуудасны "Хүлээгдэж байгаа" хэсэгт өгөгдлийг харуулах
function loadPendingRequests() {
    const pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    const pendingList = document.querySelector(".huseltuud article:nth-child(2) ul");

    pendingList.innerHTML = ""; // Одоогийн жагсаалтыг цэвэрлэх
    pendingRequests.forEach((job) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <h5>${job.title}</h5>
            <p>${job.location}</p>
            <p>${job.date}</p>
        `;
        pendingList.appendChild(listItem);
    });
}

// StudProfile хуудас ачаалагдахад дуудах
if (window.location.pathname.includes("studprofile.html")) {
    document.addEventListener("DOMContentLoaded", loadPendingRequests);
}
