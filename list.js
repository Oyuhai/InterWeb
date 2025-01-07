
const params = new URLSearchParams(window.location.search)
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
    const filteredData = mydata.filter(e => {
        const result = filters.map(({ key, value }) => e[key] == value)
        return result.every(e => e == true)
    })
    return filteredData
}

async function Render() {
    const filters = getFilter();
    const filteredData = await filterData(filters);
    const data = filteredData.reduce((p, c) => {
        return p += `<li class="ad-container">
                    <div>
                        <h4>${professionDictionary[c.profession]}</h4>
                        <p>Компани: ${c.company}, Байршил:${locationDictionary[c.location]}</p>
                        <p>${c.salary}₮</p>
                    </div>
                    <div class="ad-container-bottom">
                        <p>${statusDictionary[c.status]}</p>
                        <button class="request-btn" data-status=${c.status} data-profession=${c.profession} data-company=${c.company} data-date=${c.published}>Хүсэлт илгээх</button>
                        <button id="openPopup">Дэлгэрэнгүй</button>
                    </div>
                </li>`;
    }, '');

    const el = document.getElementById("zar");
    el.innerHTML = data;

    // Attach event listeners after rendering
    document.querySelectorAll('.request-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                alert('Та эхлээд нэвтэрнэ үү!');
                window.location.href = './signInStud.html'; // Redirect to login page
                return;
            }

            //zar ilgeeh bolomjtoi esehiig shalgah
            const statusZar = event.target.dataset.status;
            console.log(statusZar);
            if (statusZar != "open") {
                alert('Зар хаагдсан байна!');
                return;
            }

            // Get advertisement details
            const profession = event.target.dataset.profession;
            const company = event.target.dataset.company;
            const studentId = localStorage.getItem('userId');

            const dateSec = new Date();

            // Get the year, month, and day
            const year = dateSec.getFullYear();
            const month = String(dateSec.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
            const day = String(dateSec.getDate()).padStart(2, '0'); // Adds leading zero if needed

            // Format as "YYYY-MM-DD"
            const formattedDate = `${year}-${month}-${day}`;

            // Generate a unique ID for the advertisement
            const adKey = `request-${profession}-${company}-${formattedDate}-${studentId}`;

            // Check if this advertisement has already been requested
            if (localStorage.getItem(adKey)) {
                alert('Та энэ зар дээр аль хэдийн хүсэлт илгээсэн байна!');
                return;
            }

            // // Proceed with saving the request
            // const requestData = {
            //     profession,
            //     company,
            //     datePublished
            // };

            // // Save the request in localStorage
            // localStorage.setItem(adKey, JSON.stringify(requestData));
            // console.log(requestData);

            const adData = {
                profession,
                company,
                formattedDate,
                studentId,
                status: 'pending', // Or other status like 'approved' or 'notApproved'
            };

            localStorage.setItem(adKey, JSON.stringify(adData));

            alert('Хүсэлт илгээгдлээ!');
        });
    });
}

// Call Render to initialize the page
Render();

// function selectHandler(el) {
//     const value = el.value
//     const name = el.name
//     params.set(name, value)
//     window.location.search = params
// }

// window.selectHandler = selectHandler