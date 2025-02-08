
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

// Хэрэв URL параметр нь profession = backend_developer бол Init() функц нь < select > -ын утгыг backend_developer гэж тохируулна
function Init() {
    for (const key of params.keys()) {
        const el = document.getElementById(key)//url-n key-r html deh formiin selectiig barij avna
        const values = params.getAll(key) //key deerh utgiig avj value dotor hadgalna
        if (values.length == 1) { //value dotor element baigaa ooroor helvel url dotor haih utga baival uuniig in elemtentruu hiine
            el.value = values[0] //value[0] in husnegtiin ehnii utgiig avna
        }
    }
}
Init()

function getFilter() {
    const filter = []
    for (const key of params.keys()) {
        const values = params.getAll(key) //url-n key deerh utgiig avna
        if (values.length == 1 && values[0]) {
            filter.push({ key, value: values[0] })//hervee utga baival filter husnegtruu hiine
        }
    }
    console.log('====>getfilter', filter) //just checking filter dotorh utga
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
    const filters = getFilter();//url deerh utgiig avna
    const filteredData = await filterData(filters);//url deerh utgaar filterdene
    const data = filteredData.reduce((p, c) => {//reduce in buh utgaar davtaj guigeed bugdiin neg value bolgoj gargana buuh html neg html bolno gsn ug
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
    el.innerHTML = data;//reduce-r negtgesen htmlee id-r haruulna

    document.querySelectorAll('.request-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            const isLoggedIn = localStorage.getItem('isLoggedIn');//login.js deer hereglegch nevtreh uyd browseriin localstorage-d isLoggedIn true gsn utga hadgalsan
            if (!isLoggedIn) {
                alert('Та эхлээд нэвтэрнэ үү!');
                window.location.href = './signInStud.html';
                return;
            }//hervee tiim flag baihgui bol nevtreh huudasruu shiljine

            const statusZar = event.target.dataset.status; //event.target gedeg in button-oo helj biagaa. button daragdsan bol event target bolno
            //dataset.statud in html-n dataset status in zariin status baina.
            console.log(statusZar);//zar in huselt huleen avch baigaa heveeree bish bol zar haagdsan gesen alert ogno
            if (statusZar != "open") {
                alert('Зар хаагдсан байна!');
                return;
            }

            const profession = event.target.dataset.profession;//html deerh buton element dotorh data-....nuudiig avch bolno
            const company = event.target.dataset.company;
            const studentId = localStorage.getItem('userId');

            const dateSec = new Date();//current ognoog gargana 00-s hoish secondeer
            //secondoor gargaj avsan datagaa ognoo helbert oruulna
            const year = dateSec.getFullYear();
            const month = String(dateSec.getMonth() + 1).padStart(2, '0');
            const day = String(dateSec.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            //formatted ognoog student profile dr huselt ilgeesen zariin door haruulna
            const zarKey = `request-${profession}-${company}-${studentId}`;
            //localstoraged id uusgen ilgeesen zariig hadgalah in neg huselted dahin huselt ilgeehees hamgaalna
            if (localStorage.getItem(zarKey)) {
                alert('Та энэ зар дээр аль хэдийн хүсэлт илгээсэн байна!');
                return;
            }
            const zarData = {
                profession,
                company,
                formattedDate,
                studentId,
                status: 'pending',
            };
            //daraa in student profile dr gargah datagaa hadgalj baina
            localStorage.setItem(zarKey, JSON.stringify(zarData));

            alert('Хүсэлт илгээгдлээ!');
        });
    });
}

Render();
