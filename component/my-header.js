class MyHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.#render();
        this.#setupEventListeners();
    }

    #render() {
        this.innerHTML = `
            <header class="flex-col">
                <nav class="wrap header-top flex-row">
                    <a href="./home.html" class="logo">INTERN</a>
                    <a class="mobile-none" href="./home.html">Нүүр хуудас</a>
                    <a class="mobile-none" href="./list.html">Зарууд</a>
                    <a class="mobile-none profile-image" id="profileLink">
                        <img id="profileImage" src="../pics/profileIcon.png" alt="Хэрэглэгчийн профайл зураг">
                    </a>
                </nav>
                <div class="flex-col wrap header-search">
                    <form action="#" method="GET" class="flex-row filter">
                        <select name="profession" id="profession">
                            <option value="">Мэргэжил</option>
                            <option value="system_analist">Систем шинжээч</option>
                            <option value="frontend_developer">Frontend Хөгжүүлэгч</option>
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
                </div>
                <nav class="desktop-none mobile-nav">
                    <a class="mobile-nav-icon" href="home.html">
                        <i class="fa fa-home"></i>
                        <p>Нүүр хуудас</p>
                    </a>
                    <a class="mobile-nav-icon" href="list.html">
                        <i class='fa fa-book'></i>
                        <p>Зарууд</p>
                    </a>
                    <a class="mobile-nav-icon" href="studprofile.html">
                        <i class='fa fa-user-circle'></i>
                        <p>Профайл</p>
                    </a>
                </nav>
            </header>
        `;
    }

    #setupEventListeners() {
        const form = this.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const profession = form.querySelector('#profession').value;
            const location = form.querySelector('#location').value;
            const duration = form.querySelector('#duration').value;

            // Dispatch a custom event with the filter values
            this.dispatchEvent(new CustomEvent('filterChanged', {
                detail: { profession, location, duration }
            }));
        });
    }
}

window.customElements.define('my-header', MyHeader);