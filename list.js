
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
    const filters = getFilter()
    const filteredData = await filterData(filters)
    const data = filteredData.reduce((p, c) => {
        return p += `<li class="ad-container">
                    <div>
                        <h4>${professionDictionary[c.profession]}</h4>
                        <p>Компани: ${c.company}, Байршил:${locationDictionary[c.location]}</p>
                        <p>${c.salary}₮</p>
                    </div>
                    <div class="ad-container-bottom">
                        <p>${statusDictionary[c.status]}</p>
                        <button>Хүсэлт илгээх</button>
                        <button id="openPopup">Дэлгэрэнгүй</button>
                        
                    </div>
                </li>`
    }, '')
    const el = document.getElementById("zar")
    el.innerHTML = data
}
Render()

// function selectHandler(el) {
//     const value = el.value
//     const name = el.name
//     params.set(name, value)
//     window.location.search = params
// }

// window.selectHandler = selectHandler