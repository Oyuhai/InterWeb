const params = new URLSearchParams(window.location.search)
const professionDictionary = {
    backend_developer: "Backend хөгжүүлэгч",
    system_analyst: "Систем шинжээч",
    frontend_developer: "Frontend Хөгжүүлэгч",
    system_admin: "Системийн админ",
    tuslah_engineer: "Туслах инженер"
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

function Init() {
    for (const key of params.keys()) {
        const el = document.getElementById(key)
        const values = params.getAll(key)
        if (values.length == 1) {
            el.value = values[0]
        }
    }
}
Init()

function getFilter() {
    const filter = []
    for (const key of params.keys()) {
        const values = params.getAll(key)
        if (values.length == 1 && values[0]) {
            filter.push({ key, value: values[0] })
        }
    }
    console.log('====>getfilter', filter)
    return filter
}

async function filterData(filters) {
    const mydata = await fetch('/mydata.json')
        .then((response) => response.json())
    const filteredData = mydata.filter(el => {
        const result = filters.map(({ key, value }) => el[key] == value)
        return result.every(el => el == true)
    })
    return filteredData
}

async function Render() {
    const filters = getFilter();
    const filteredData = await filterData(filters);
    const el = document.getElementById("zar");
    el.innerHTML = '';

    filteredData.forEach(ad => {
        const adElement = document.createElement('my-ad');
        adElement.setAttribute('profession', professionDictionary[ad.profession]);
        adElement.setAttribute('company', ad.company);
        adElement.setAttribute('location', locationDictionary[ad.location]);
        adElement.setAttribute('salary', ad.salary);
        adElement.setAttribute('status', statusDictionary[ad.status]);
        el.appendChild(adElement);
    });

    document.querySelectorAll('.request-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                alert('Та эхлээд нэвтэрнэ үү!');
                window.location.href = './signInStud.html';
                return;
            }

            const statusZar = event.target.dataset.status;
            console.log(statusZar);
            if (statusZar != "open") {
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
    });
}

Render();