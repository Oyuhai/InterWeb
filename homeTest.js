const professionDictionary = {
    backend_developer: "Backend хөгжүүлэгч",
    frontend_developer: "Frontend хөгжүүлэгч",
    system_admin: "Системийн админ",
    tuslah_engineer: "Туслах инженер",
    system_analyst: "Систем аналист"
}

const locationDictionary = {
    bzd: "Баянзүрх дүүрэг",
    chd: "Чингэлтэй дүүрэг",
    hud: "Хан-Уул дүүрэг"
}

const zarData = await fetch('/mydata.json')
    .then((response) => response.json())

//nuu huudas deer zar haruulahdaa companiar in bagtslah tul uund zoriulsan husnegtiig uusgeh function
async function companyGroupZar() {
    const haruulahZaruud = {};
    zarData.forEach(zar => {
        if (haruulahZaruud[zar.company]) {
            haruulahZaruud[zar.company].push(zar);
        } else {
            haruulahZaruud[zar.company] = [zar];
        }
    })


}

ActiveZarHAruulah()


