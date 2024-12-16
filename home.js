
const professionDictionary = {
    backend_developer: "Backend Хөгжүүлэгч",
    system_analist: "Систем шинжээч",
    frontend_developer: "Frontend Хөгжүүлэгч",
    tuslah_engineer: "Туслах инженер",
    system_admin: "Системийн админ"
}

async function Init() {
    const mydata = await fetch('/mydata.json')
        .then((response) => response.json()) //json datagaa irtel huleene

    const companyDictionary = {} //company ner=key object uusgene

    mydata.forEach(zar => {
        if (companyDictionary[zar.company]) {//oject dotor company baihgui bol company push
            companyDictionary[zar.company].push(zar)
        } else {
            companyDictionary[zar.company] = [zar]//company key baival key deeree zaraa oruulna
        }
    })

    const homePageCompany = Object.keys(companyDictionary).reduce((p, c) => {//companyDictionary deerh key-r guine. key tus bur deer html oruulna. p=previous, c=current
        const imageUrl = companyDictionary[c][0].image; //hamgiin ehnii item-n zurgiig avna
        const companyHtml = `<article class="flex-col company">
                        <img src="${imageUrl}" alt="company logo">
                        <h4>${c}</h4>
                        <ul>
                            ${companyDictionary[c].reduce((p, c, i) => { //dictionary key=c dotorhn zaruudiig open statustaig oruulj bn.
            if (c.status == "open")
                return p + `<li>${professionDictionary[c.profession]}</li>`;
            else return p
        }, '')}
                        </ul>
                    </article>`
        return p += companyHtml
    }, '')

    const b = document.getElementById("test")//HTML dotroosoo id-r in renderlene
    b.innerHTML = homePageCompany


}

Init()


