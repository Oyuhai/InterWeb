export default class AdComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set adData(data) {
        this.render(data);
    }

    render(data) {
        const professionDictionary = {
            backend_developer: "Backend хөгжүүлэгч",
            system_analist: "Систем шинжээч",
            frontend_developer: "Frontend Хөгжүүлэгч",
            system_admin: "Системийн админ",
            tuslah_engineer: "Туслах инженер"
        };

        const locationDictionary = {
            bzd: "Баянзүрх дүүрэг",
            chd: "Чингэлтэй дүүрэг",
            hud: "Хан-Уул дүүрэг"
        };

        const statusDictionary = {
            open: "Нээлттэй",
            closed: "Хаагдсан"
        };

        this.shadowRoot.innerHTML = `
            <style>
                .request-btn {
                    cursor: pointer;
                }

                .ad-container {
                    display: flex;
                    justify-content: space-between;
                    padding: 1.5rem 3rem;
                    box-shadow: var(--shadow);
                    border-radius: 0.5rem;
                }

                .ad-container>div button {
                    border: 1px solid var(--brand-color);
                    border-radius: .7rem;
                    padding: 0.2rem 1.5rem;
                    background-color: transparent;
                }

                .ad-container-bottom p {
                    text-align: end;
                }

                .ad-container h4 {
                    font-size: 1.5rem;
                    font-weight: 400;
                }
            </style>
            <li class="ad-container">
                <div>
                    <h4>${professionDictionary[data.profession]}</h4>
                    <p>Компани: ${data.company}, Байршил: ${locationDictionary[data.location]}</p>
                    <p>${data.salary}₮</p>
                </div>
                <div class="ad-container-bottom">
                    <p>${statusDictionary[data.status]}</p>
                    <button class="request-btn" data-status=${data.status} data-profession=${data.profession} data-company=${data.company} data-date=${data.published}>Хүсэлт илгээх</button>
                    <button class="open-popup">Дэлгэрэнгүй</button>
                </div>
            </li>
        `;

        this.shadowRoot.querySelector('.request-btn').addEventListener('click', (event) => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                alert('Та эхлээд нэвтэрнэ үү!');
                window.location.href = './signInStud.html';
                return;
            }

            if (event.target.dataset.status !== "open") {
                alert('Зар хаагдсан байна!');
                return;
            }

            const profession = event.target.dataset.profession;
            const company = event.target.dataset.company;
            const studentId = localStorage.getItem('userId');
            const adKey = `request-${profession}-${company}-${studentId}`;

            if (localStorage.getItem(adKey)) {
                alert('Та энэ зар дээр аль хэдийн хүсэлт илгээсэн байна!');
                return;
            }

            const date = new Date().toISOString().split('T')[0];
            localStorage.setItem(adKey, JSON.stringify({ profession, company, date, studentId, status: 'pending' }));
            alert('Хүсэлт илгээгдлээ!');
        });
    }
}
customElements.define('ad-component', AdComponent);