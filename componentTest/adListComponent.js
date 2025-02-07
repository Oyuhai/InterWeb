import { AdComponent } from './adComponent.js';

export class AdListComponent extends HTMLElement {
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
                } 
                .flex-col {
                display: flex;
                flex-direction: column;
                }
                .wrap {
                max-width: 1300px;
                width: 100%;
                margin: 0 auto;
                } 
                </style>
                <ul class="flex-col" id="ads-list"></ul>`;
        const list = this.shadowRoot.getElementById('ads-list');
        data.forEach(ad => {
            const adElement = new AdComponent();
            adElement.adData = ad;
            list.appendChild(adElement);
        });
    }
}

customElements.define('ad-list-component', AdListComponent);
