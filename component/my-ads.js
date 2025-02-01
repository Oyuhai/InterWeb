class MyAd extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.profession = this.getAttribute("profession");
        this.company = this.getAttribute("company");
        this.location = this.getAttribute("location");
        this.salary = this.getAttribute("salary");
        this.status = this.getAttribute("status");
        this.#render();
        this.#setupEventListeners();
    }

    #render() {
        this.innerHTML = `
            <li class="ad-container">
                <div>
                    <h4>${this.profession}</h4>
                    <p>Компани: ${this.company}, Байршил: ${this.location}</p>
                    <p>${this.salary}₮</p>
                </div>
                <div class="ad-container-bottom">
                    <p>${this.status}</p>
                    <button class="request-btn" data-status=${this.status} data-profession=${this.profession} data-company=${this.company}>Хүсэлт илгээх</button>
                    <button id="openPopup">Дэлгэрэнгүй</button>
                </div>
            </li>
        `;
    }

    #setupEventListeners() {
        const requestBtn = this.querySelector('.request-btn');
        requestBtn.addEventListener('click', (event) => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                alert('Та эхлээд нэвтэрнэ үү!');
                window.location.href = './signInStud.html';
                return;
            }

            const statusZar = event.target.dataset.status;
            if (statusZar !== "open") {
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
    }
}

window.customElements.define('my-ad', MyAd);