const params = new URLSearchParams(window.location.search)

const mydata = [
    {
        "id": 1,
        "profession": "system_analist",
        "location": "hud",
        "duration": "1_3",
        "company": "ICT",
        "salary": 1200000,
        "status": "open"
    },
    {
        "id": 2,
        "profession": "frontend_developer",
        "location": "chd",
        "duration": "4_6",
        "company": "Itools",
        "salary": 900000,
        "status": "closed"
    },
    {
        "id": 3,
        "profession": "backend_developer",
        "location": "bzd",
        "duration": "7_9",
        "company": "Itheme",
        "salary": 1400000,
        "status": "open"
    },
    {
        "id": 4,
        "profession": "frontend_developer",
        "location": "hud",
        "duration": "1_3",
        "company": "ICT",
        "salary": 800000,
        "status": "closed"
    },
    {
        "id": 5,
        "profession": "backend_developer",
        "location": "chd",
        "duration": "4_6",
        "company": "Itools",
        "salary": 1300000,
        "status": "open"
    },
    {
        "id": 6,
        "profession": "system_analist",
        "location": "bzd",
        "duration": "7_9",
        "company": "Itheme",
        "salary": 1500000,
        "status": "closed"
    },
    {
        "id": 7,
        "profession": "frontend_developer",
        "location": "hud",
        "duration": "4_6",
        "company": "ICT",
        "salary": 1100000,
        "status": "open"
    },
    {
        "id": 8,
        "profession": "backend_developer",
        "location": "chd",
        "duration": "1_3",
        "company": "Itools",
        "salary": 700000,
        "status": "closed"
    },
    {
        "id": 9,
        "profession": "system_analist",
        "location": "bzd",
        "duration": "4_6",
        "company": "Itheme",
        "salary": 950000,
        "status": "open"
    },
    {
        "id": 10,
        "profession": "frontend_developer",
        "location": "hud",
        "duration": "7_9",
        "company": "ICT",
        "salary": 1250000,
        "status": "closed"
    },
    {
        "id": 11,
        "profession": "system_analist",
        "location": "chd",
        "duration": "1_3",
        "company": "Itools",
        "salary": 1350000,
        "status": "open"
    },
    {
        "id": 12,
        "profession": "backend_developer",
        "location": "bzd",
        "duration": "4_6",
        "company": "Itheme",
        "salary": 1450000,
        "status": "closed"
    },
    {
        "id": 13,
        "profession": "system_analist",
        "location": "hud",
        "duration": "7_9",
        "company": "ICT",
        "salary": 500000,
        "status": "open"
    },
    {
        "id": 14,
        "profession": "frontend_developer",
        "location": "chd",
        "duration": "1_3",
        "company": "Itools",
        "salary": 750000,
        "status": "closed"
    },
    {
        "id": 15,
        "profession": "backend_developer",
        "location": "bzd",
        "duration": "7_9",
        "company": "Itheme",
        "salary": 1350000,
        "status": "open"
    }
]

const professionDictionary = {
    backend_developer: "Backend Хөгжүүлэгч",
    system_analist: "Систем шинжээч",
    frontend_developer: "Frontend Хөгжүүлэгч"
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
    return filter
}

function filterData(filters) {
    const filteredData = mydata.filter(e => {
        const result = filters.map(({ key, value }) => e[key] == value)
        return result.every(e => e == true)
    })
    return filteredData
}

function Render() {
    let data = ``
    const filters = getFilter()
    const filteredData = filterData(filters)
    filteredData.forEach(e => {
        data += `<li>
                    <h4>${professionDictionary[e.profession]}</h4>
                    <p>Компани: ${e.company}, Байршил:${e.location}</p>
                    <p>${e.salary}₮</p>
                    <p>${e.status}</p>
                    <button>Дэлгэрэнгүй</button>
                </li>`
    })
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