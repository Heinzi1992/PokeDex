
let timer;
let renderCount = 0;
let allPkm = [];
let lastQuerry = '';
const pokemonCount = 1025;     // 1025




async function init() {

    loadAllPkm();
    let amount = pkmrenderAmount();
    renderAll(amount);
    
}


// render each Pokemon Card
async function renderAll(amount) {
    if (amount === renderCount) return;
    let container = document.getElementById('test');
    // container.innerHTML = "";
    if (amount > renderCount) {
    for (let i = renderCount + 1; i <= amount; i++) {
        
        let typesForPkm = await getData(i);
        let imgSrc = await getDataImg(i);
        let pkmNames = await getDataName(i);
        let pkmTypes = await typesPromise(typesForPkm);
        let background = typesForPkm[0];
        let cardHtml = pokeCardTemplate(imgSrc, i, pkmNames, background);
        container.insertAdjacentHTML('beforeend', cardHtml);
        let typesContainer = document.getElementById('types' + i);
        typesContainer.innerHTML = pkmTypes;
        } 
        } else {
            removeCards(amount);
            renderCount = amount;
        }
    renderCount = amount;
}

// render Dialog Window
async function renderDialog(i) {
    console.log(i);

    let container = document.getElementById('dialog');
    let typesForPkm = await getData(i);
    let pkmNames = await getDataName(i);
    let background = typesForPkm[0];
    let imgSrc = await getDataImg(i);
    let dialogHtml = dialogTemplate(i, pkmNames, background, imgSrc);
    container.innerHTML = dialogHtml;
   
}

// load all pokemon Data for search Function
async function loadAllPkm() {
    let list = [];

    for(let i = 1; i <= pokemonCount; i++) {
        let [name, types] = await Promise.all([
            getDataName(i),
            getData(i)
        ]);

        list.push({
            id: i,
            name,
            types
        });
        
    }
    allPkm = list;
    
}

// render filtered Pokemon Cards
function renderFilteredPkm() {
    let q = document.getElementById('search').value || '';
    let trimmed = q.trim();

    if (q === lastQuerry) {
        return
    }

    clearTimeout(timer);
    timer = setTimeout(() => {

    if (trimmed.length < 3) {
        // zurück zum normalen Modus (Mengen-Rendering)
        lastQuerry = trimmed;
        renderCount = 0;
        document.getElementById('test').innerHTML = '';
        const amount = pkmrenderAmount();
        renderAll(amount);
        return;
      }
    let filtered = filterPkm(q);
    lastQuerry = q;
    renderList(filtered);
    },750);

}

// Delay renderAll for search Function, to not refresh immediatly
function inputDelay(){
    clearTimeout(timer);
    timer = setTimeout(() => {
        let amount = pkmrenderAmount();
        renderAll(amount);
    }, 750); 
}


function filterPkm(query) {
    let input = query.trim().toLowerCase();
    if (input.length < 3) {
        return allPkm;
    }
    return allPkm.filter(pkm => {
        let nameMatch = pkm.name.toLowerCase().includes(input);
        let typeMatch = pkm.types.some(type => type.toLowerCase().includes(input));
        return nameMatch || typeMatch;
    });
}

function removeCards(target){
    // let container = document.getElementById('test');
    
    for(let i = renderCount; i > target; i--) {
        let card = document.getElementById('pkm-card-' + i);
        if (card) card.remove();
    }
}

async function typesPromise(typesForPkm) {
    // let container = document.getElementById('types');
    let pkmTypesHtml = " ";
    
    for (let index = 0; index < typesForPkm.length; index++){
        let typeForPkm = typesForPkm[index];
        pkmTypesHtml += '<img class="pkm-type-img" src="imgs/' + typeForPkm + '.png" alt="' + typeForPkm + '">'
    }
    
    return pkmTypesHtml;
}

function pkmrenderAmount() {
    
    let amount = document.getElementById('render-amount').value;
    amount = Number(amount);
    if(amount <= 1) {
        amount = 1;
        return amount;
    }
    return amount;
}



function renderMoreCards() {
    let input = document.getElementById('render-amount');
    let numberOfCards = input.value
    numberOfCards = Number(numberOfCards)
    let newInputValue = numberOfCards + 20;
    input.value = newInputValue;
    inputDelay();
}

async function renderList(list) {
    let container = document.getElementById('test');
    container.innerHTML = '';
  
    if (!list || list.length === 0) {
      container.innerHTML = `<p style="padding:12px; color: white;">Keine Treffer!</p>`;
      return;
    }
  
    for (let index = 0; index < list.length; index++) {
      let p = list[index];
      let i = p.id;
      let imgSrc = await getDataImg(i);          
      let pkmTypesHtml = await typesPromise(p.types);
      let background = p.types[0];
      let cardHtml = pokeCardTemplate(imgSrc, i, p.name, background);
  
      container.insertAdjacentHTML('beforeend', cardHtml);
      let typesContainer = document.getElementById('types' + i);
      if (typesContainer) typesContainer.innerHTML = pkmTypesHtml;
    }
  }

async function showAndCloseDialog(i){
    document.getElementById('overlay').classList.toggle('d-none');
    document.getElementById('body').classList.toggle('no-scroll');
    renderDialog(i);
}

function closeDialog(){
    document.getElementById('overlay').classList.add('d-none')
    document.getElementById('body').classList.remove('no-scroll');
}