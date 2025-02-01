class MyFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        this.innerHTML = `
            <footer class="wrap container-padding-x">
                <div class="footer-content">
                    <div class="footer-logo">
                        <div class="logo">INTERN</div>
                        <p>Шинэ заруудыг хүлээлгүй авахын тулд манайд нэгдээрэй.</p>
                        <p>Бүртгүүлснээр та манай <u>Нууцлалын бодлогыг</u> хүлээн зөвшөөрч, манай компанийн мэдээлэл
                            мэйлээр авахыг зөвшөөрч байна.</p>
                    </div>
                    <nav class="mobile-none footer-links">
                        <h4>Хэрэгтэй хуудас</h4>
                        <ul>
                            <li><a href="#">Нүүр хуудас</a></li>
                            <li><a href="#">Заруд</a></li>
                            <li><a href="#">Бүртгүүлэх</a></li>
                            <li><a href="#">Нэвтрэх</a></li>
                        </ul>
                    </nav>
                    <nav class="mobile-none footer-social">
                        <h4>Бидэнтэй нэгдээрэй</h4>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">X</a></li>
                            <li><a href="#">LinkedIn</a></li>
                        </ul>
                    </nav>
                </div>
                <p class="footer-bottom">© 2024 Internships. All rights reserved.</p>
            </footer>
        `;
    }
}

window.customElements.define('my-footer', MyFooter);