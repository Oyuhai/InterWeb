class AdComponent extends HTMLElement {
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
            system_analyst: "Систем шинжээч",
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

class AdListComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set ads(data) {
        this.render(data);
    }

    render(data) {
        this.shadowRoot.innerHTML = `<style>.all-ad {
    padding-bottom: 2.25rem;
    gap: 0.2rem;
} .flex-col {
    display: flex;
    flex-direction: column;
}.wrap {
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
} </style><ul class="flex-col" id="ads-list"></ul>`;
        const list = this.shadowRoot.getElementById('ads-list');
        data.forEach(ad => {
            const adElement = document.createElement('ad-component');
            adElement.adData = ad;
            list.appendChild(adElement);
        });
    }
}
customElements.define('ad-list-component', AdListComponent);

class FilterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    async fetchData() {
        const response = await fetch('/mydata.json');
        return response.json();
    }

    getFilters() {
        const params = new URLSearchParams(window.location.search);
        return Array.from(params.keys()).map(key => ({ key, value: params.get(key) }));
    }

    async filterData() {
        const data = await this.fetchData();
        const filters = this.getFilters();
        return data.filter(ad => filters.every(({ key, value }) => ad[key] == value));
    }

    async applyFilters() {
        const filteredAds = await this.filterData();
        const adList = document.querySelector('ad-list-component');
        if (adList) {
            adList.ads = filteredAds;
        }
    }

    formSubmitHandler(event) {
        event.preventDefault();  // Prevent page refresh

        const form = this.shadowRoot.querySelector('form');
        const formData = new FormData(form);
        const params = new URLSearchParams();

        // Convert form data to URL query parameters
        for (const [key, value] of formData.entries()) {
            if (value) params.append(key, value);
        }

        // Update URL without reloading
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

        // Apply filters after the form is submitted
        this.applyFilters();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                a {
                    text-decoration: none;
                    color: white;
                    font-size: 1rem;
                }
                .flex-row {
                    display: flex;
                    flex-direction: row;
                }
                @media screen and (min-width: 769px) {
                    .desktop-none {
                        display: none;
                    }
                }
                @media screen and (max-width: 768px) {
                    :root {
                        --container-padding: 1.25rem;
                        font-size: 14px;
                    }
                    .mobile-none {
                        display: none;
                    }
                }
                .filter {
                    height: max-content;
                    gap: 1rem;
                }
                select {
                    flex: 2;
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    text-align: center;
                }
                form.filter>button {
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    border: var(--border) white;
                    background-color: transparent;
                    color: white;
                    flex: 1;
                    white-space: nowrap;
                    cursor: pointer;
                    font-size: 1rem;
                }
            </style>
            <form action="#" method="GET" class="flex-row filter">
                <select name="profession" id="profession">
                    <option value="">Мэргэжил</option>
                    <option value="backend_developer">Backend хөгжүүлэгч</option>
                    <option value="system_analyst">Систем шинжээч</option>
                    <option value="frontend_developer">Frontend Хөгжүүлэгч</option>
                    <option value="system_admin">Системийн админ</option>
                    <option value="tuslah_engineer">Туслах инженер</option>
                </select>
                <select name="location" id="location">
                    <option value="">Байршил</option>
                    <option value="hud">Хан Уул</option>
                    <option value="chd">Чингэлтэй</option>
                </select>
                <select class="mobile-none" name="duration" id="duration">
                    <option value="">Хугацаа</option>
                    <option value="1_3">1-3 сар</option>
                    <option value="4_6">4-6 сар</option>
                </select>
                <button class="mobile-none" type="submit">Зар шүүх</button>
                <button class="desktop-none" type="submit">&#x1F50D;</button>
            </form>
        `;

        // Add event listener for form submission
        this.shadowRoot.querySelector('form').addEventListener('submit', (event) => this.formSubmitHandler(event));
    }
}

customElements.define('filter-component', FilterComponent);

window.onload = () => {
    document.body.innerHTML += '<ad-list-component></ad-list-component>';
};
