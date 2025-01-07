class Zar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.profession = this.getAttribute("profession") || "Not Specified";
        this.location = this.getAttribute("location") || "Unknown";
        this.duration = this.getAttribute("duration") || "Unknown";
        this.company = this.getAttribute("company") || "Unknown";
        this.salary = this.getAttribute("salary") || "Not Disclosed";
        this.status = this.getAttribute("status") || "closed";
        this.logo = this.getAttribute("logoImage") || "N/A";
        this.datePublished = this.getAttribute("date") || "N/A";

        this.render();

        // Event listeners for popup and request actions
        this.querySelector("#openPopup")?.addEventListener("click", this.openPopup.bind(this));
        this.querySelector(".request-btn")?.addEventListener("click", this.handleRequest.bind(this));
    }

    async render() {
        const filters = this.getFilter();
        const filteredData = await this.filterData(filters);

        const professionDictionary = {
            backend_developer: "Backend Хөгжүүлэгч",
            system_analist: "Систем шинжээч",
            frontend_developer: "Frontend Хөгжүүлэгч"
        }

        const locationDictionary = {
            bzd: "Баянзүрх дүүрэг",
            chd: "Чингэлтэй дүүрэг",
            hud: "Хан-Уул дүүрэг"
        }

        const statusDictionary = {
            open: "Нээлттэй",
            closed: "Хаагдсан"
        }


        const data = filteredData.reduce((html, c) => {
            return (
                html +
                `<li class="ad-container">
                <div>
                    <h4>${professionDictionary[c.profession] || c.profession}</h4>
                    <p>Компани: ${c.company}, Байршил: ${locationDictionary[c.location] || c.location}</p>
                    <p>${c.salary}₮</p>
                </div>
                <div class="ad-container-bottom">
                    <p>${statusDictionary[c.status] || c.status}</p>
                    <button 
                        class="request-btn" 
                        data-status="${c.status}" 
                        data-profession="${c.profession}" 
                        data-company="${c.company}" 
                        data-date="${c.published}">
                        Хүсэлт илгээх
                    </button>
                    <button id="openPopup">Дэлгэрэнгүй</button>
                </div>
            </li>`
            );
        }, "");

        const el = document.getElementById("zar");
        if (el) {
            el.innerHTML = data;
        }
    }


    getFilter() {
        const filters = [];
        for (const key of params.keys()) {
            const values = params.getAll(key);
            if (values.length === 1 && values[0]) {
                filters.push({ key, value: values[0] });
            }
        }
        console.log("====>getfilter", filters);
        return filters;
    }

    async filterData(filters) {
        const mydata = await fetch("/mydata.json").then((response) => response.json());
        return mydata.filter((e) => {
            return filters.every(({ key, value }) => e[key] == value);
        });
    }

    openPopup() {
        alert(
            `Дэлгэрэнгүй мэдээлэл: \nМэргэжил: ${this.profession}\nКомпани: ${this.company}\nБайршил: ${this.location}\nЦалин: ${this.salary}₮\nХугацаа: ${this.duration}`
        );
    }

    handleRequest(event) {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            alert("Та эхлээд нэвтэрнэ үү!");
            window.location.href = "./signInStud.html";
            return;
        }

        const statusZar = event.target.dataset.status;
        if (statusZar !== "open") {
            alert("Зар хаагдсан байна!");
            return;
        }

        const profession = event.target.dataset.profession;
        const company = event.target.dataset.company;
        const studentId = localStorage.getItem("userId");
        const dateSec = new Date();
        const formattedDate = `${dateSec.getFullYear()}-${String(dateSec.getMonth() + 1).padStart(2, "0")}-${String(
            dateSec.getDate()
        ).padStart(2, "0")}`;

        const adKey = `request-${profession}-${company}-${formattedDate}-${studentId}`;

        if (localStorage.getItem(adKey)) {
            alert("Та энэ зар дээр аль хэдийн хүсэлт илгээсэн байна!");
            return;
        }

        const adData = {
            profession,
            company,
            formattedDate,
            studentId,
            status: "pending",
        };
        localStorage.setItem(adKey, JSON.stringify(adData));

        alert("Хүсэлт илгээгдлээ!");
    }
}

window.customElements.define("zar-component", Zar);

document.addEventListener("DOMContentLoaded", async () => {
    const zarComponent = new Zar();
    await zarComponent.render();
});
