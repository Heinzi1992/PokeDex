


function showDialog(i){
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('body').classList.add('no-scroll');
    fetchSpeciesData(i);
}

function closeDialog(){
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
}

// remove Border Bottom in Dialog
function addBorderBottom(name){
    dataHeadline = document.getElementsByClassName('all-data-headline')
    for (let i = 0; i < dataHeadline.length; i++){
        let headline = dataHeadline[i];
        document.getElementById(`${headline.id}`).classList.remove('border-bottom-selector');        
    }
    document.getElementById(`${name}`).classList.add('border-bottom-selector');
}

// render Dialog Window
async function renderDialog(i) {
    let container = document.getElementById('dialog-upper-half');
    let typesForPkm = await getDataTypes(i);
    let pkmNames = mainDatas[i].name;
    let pkmTypes = await typesHtml(typesForPkm);
    let background = typesForPkm[0];
    let imgSrc = mainDatas[i].sprites.other.home.front_default;
    let dialogHtml = dialogTemplate(i, pkmNames, background, imgSrc,);
    container.innerHTML = dialogHtml;
    let typesContainer = document.getElementById('dialog-types' + i);
    typesContainer.innerHTML = pkmTypes;
    renderDialogValues(i);
}

async function renderDialogValues(i){
    const statsNames = document.getElementById('stats-names').classList.add('d-none')
    const valuesContainer = document.getElementById('all-dialog-containers');
    valuesContainer.classList.remove('evo-imgs-container', 'width-250px');
    valuesContainer.innerHTML = "";
    let abilities = await renderAbilities(i);
    let baseExperience = mainDatas[i].base_experience;
    let weight = mainDatas[i].weight;
    let height = mainDatas[i].height;
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
    return pkmAbilitiesHtml;
}

function stopEventBubbling(event){
    event.stopPropagation();
}

function renderStatsAndStatsnameContainer(){
    renderStatsBar();
    const statsAndStatsnameContainer = document.getElementById('all-dialog-containers');
    const statsNames = document.getElementById('stats-names');
    statsNames.classList.remove('d-none')
}

function renderStatsBar(){
    const statsContainer = document.getElementById('all-dialog-containers');
    statsContainer.classList.remove('evo-imgs-container');
    statsContainer.classList.add('width-250px');
    statsContainer.innerHTML = "";
    for (let index = 0; index < stats.length; index++){
        let statsBarContainer = document.createElement('div');
        statsBarContainer.id = "my-stats"
        let statBar = document.createElement('div');
        statBar.id = "stats-bar"
        statBar.style.width = stats[index] / 2 + '%';
        statsBarContainer.appendChild(statBar);
        statsContainer.appendChild(statsBarContainer);     
    }
}

function renderEvoImgs(){
    console.log(evoImgs);
    const statsNames = document.getElementById('stats-names').classList.add('d-none')
    const evoContainer = document.getElementById('all-dialog-containers');
    evoContainer.innerHTML = "";
    evoContainer.classList.add('evo-imgs-container');
    evoContainer.classList.remove('width-250px');
    for (let i = 0; i < evoImgs.length; i++){
        evoContainer.innerHTML += `<img class="dialog-evo-img" src="${evoImgs[i]}" alt="Evolution Image">`
    }
}

