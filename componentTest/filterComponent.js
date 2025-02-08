class filterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    async fetchData() {
        try {
            const response = await fetch('/api/intern-ads');
            if (!response.ok) {
                throw new Error('intern_ads tatahad aldaa garlaa');
            }
            console.log("db-s intern_ads amjiltta tatsan")
            return await response.json();
        } catch (error) {
            console.error("intern_ads tatahad aldaa garlaa ", error);
            return [];
        }
    }

    async connectedCallback() {
        await this.applyFilters(); // DOM uusenguut duudagdana
    }
    getFilters() {
        const params = new URLSearchParams(window.location.search);
        return Array.from(params.keys()).map(function (key) {
            return { key: key, value: params.get(key) };
        });
    }

    async filterData() {
        const mydata = await this.fetchData(); //json duudah funktsiig duudna. deer todorhoilson
        const filters = this.getFilters(); //URL deerh haih utguudiig avah funkts mon deer todorhoilson
        if (filters.length === 0) return mydata;//filter hooson baih uyd buh zariig butsaana
        return mydata.filter(ad => filters.every(({ key, value }) => ad[key] == value));//jish: profession:back_end developer baival filteriin { key, value } in objectiig zadlan, key-d profession, value-d back_end onoogdono. mydata-n ad-n key-tei haritsuulan adilhan objectuudiin husnegtiig butsaana
    }

    async applyFilters() {
        const filteredAds = await this.filterData();
        const adList = document.querySelector('ad-list-component');
        if (adList) {
            adList.ads = filteredAds;
        }
    }

    formSubmitted(submitted) {
        submitted.preventDefault();
        const form = this.shadowRoot.querySelector('form');
        const formData = new FormData(form);
        const params = new URLSearchParams();

        //formData.entry formiin songogdson buh key valuen husnegtiig butsaana
        for (const [key, value] of formData.entries()) {
            if (value) {
                params.append(key, value);
            }
        }

        //URL-aa reload hiilgui shinechilne window.history.replaceState(state/url oorchlolhgu state hadgalah/, title, url)
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

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
                    label{
                    display:none;}
            </style>
           <form action="#" method="GET" class="flex-row filter">
                <label for="profession">Мэргэжил:</label>
                <select name="profession" id="profession">
                    <option value="">Мэргэжил</option>
                    <option value="backend_developer">Backend хөгжүүлэгч</option>
                    <option value="system_analyst">Систем шинжээч</option>
                    <option value="frontend_developer">Frontend хөгжүүлэгч</option>
                    <option value="system_admin">Системийн админ</option>
                    <option value="tuslah_engineer">Туслах инженер</option>
                </select>

                <label for="location">Байршил:</label>
                <select name="location" id="location">
                    <option value="">Байршил</option>
                    <option value="hud">Хан Уул</option>
                    <option value="chd">Чингэлтэй</option>
                </select>

                <label for="duration">Хугацаа:</label>
                <select class="mobile-none" name="duration" id="duration">
                    <option value="">Хугацаа</option>
                    <option value="1_3">1-3 сар</option>
                    <option value="4_6">4-6 сар</option>
                </select>

                <button class="mobile-none" type="submit">Зар шүүх</button>
                <button class="desktop-none" type="submit">&#x1F50D;</button>
            </form>

        `;

        this.shadowRoot.querySelector('form').addEventListener('submit', (submitted) => this.formSubmitted(submitted));
    }
}

customElements.define('filter-component', filterComponent);
