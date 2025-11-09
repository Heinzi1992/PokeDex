
// render Dialog Window
async function renderDialog(i) {
    let container = document.getElementById('dialog');
    let typesForPkm = await getDataTypes(i);
    let pkmNames = await getDataName(i);
    let pkmTypes = await typesPromise(typesForPkm);
    let background = typesForPkm[0];
    let imgSrc = await getDataImg(i);
    let dialogHtml = dialogTemplate(i, pkmNames, background, imgSrc,);
    container.innerHTML = dialogHtml;
    let typesContainer = document.getElementById('dialog-types' + i);
        typesContainer.innerHTML = pkmTypes;
   renderDialogValues(i);

}

async function renderDialogValues(i){
    let valuesContainer = document.getElementById('values');
    let abilities = await renderAbilities(i);
    let baseExperience = await getBaseExperience(i);
    let weight = await getWeight(i);
    let height = await getHeight(i);
    let mainValues = dialogMainTemplate(abilities, baseExperience, weight, height)
    valuesContainer.innerHTML = mainValues;
}

async function renderAbilities(i){
    let abilities = await getDataAbilities(i);
    let pkmAbilitiesHtml = " ";

    for (let i = 0; i < abilities.length; i++) {
        let abilitie = abilities[i];
        if (abilities.length === 1) {
        pkmAbilitiesHtml += `${abilitie} `
        } else if (i === abilities.length -1) {
            pkmAbilitiesHtml += `${abilitie} `
        } else {
            pkmAbilitiesHtml += `${abilitie}, `
        }
        
    }
    console.log(pkmAbilitiesHtml);
    
    return pkmAbilitiesHtml;
    
}