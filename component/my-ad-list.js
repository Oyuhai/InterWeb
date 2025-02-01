class MyAdList extends HTMLElement {
    constructor() {
        super();
        this.ads = [];
    }

    connectedCallback() {
        this.#fetchData();
        this.#setupEventListeners();
    }

    async #fetchData() {
        // Fetch data from JSON (replace with your actual API endpoint)
        const response = await fetch('/mydata.json');
        this.ads = await response.json();
        this.#render();
    }

    #render(filteredAds = this.ads) {
        this.innerHTML = `
            <ul class="flex-col all-ad">
                ${filteredAds.map(ad => `
                    <my-ad
                        profession="${ad.profession}"
                        company="${ad.company}"
                        location="${ad.location}"
                        salary="${ad.salary}"
                        status="${ad.status}"
                    ></my-ad>
                `).join('')}
            </ul>
        `;
    }

    #setupEventListeners() {
        // Listen for filter changes from the header
        document.querySelector('my-header').addEventListener('filterChanged', (e) => {
            const { profession, location, duration } = e.detail;
            const filteredAds = this.ads.filter(ad => {
                return (!profession || ad.profession === profession) &&
                    (!location || ad.location === location) &&
                    (!duration || ad.duration === duration);
            });
            this.#render(filteredAds);
        });
    }
}

window.customElements.define('my-ad-list', MyAdList);