
let timer;
let renderCount = 0;
let filteredPkm = [];
let lastQuerry = '';
const pokemonCount = 1025;     // 1025=all  386=3Gens  
const amountInput = document.getElementById('render-amount');



amountInput.addEventListener('input',() => {
    if (amountInput.value > 1025) {
        amountInput.value = 1025;
    }
});

async function init() {
    let amount = pkmrenderAmount();
    await fetchMainData(pokemonCount);
    clearTimeout(timer);
    timer = setTimeout(() => {
    closeLoadingSpinnerShowCards();    
    }, 1500); 
    loadFilteredPokemons();
    renderAll(amount);
}

function closeLoadingSpinnerShowCards(){
    const spinnerOverlay = document.getElementById('loading-spinner-container');
    const contentContainer = document.getElementById('content');
    const header = document.getElementById('header');
    const button = document.getElementById('load-more-button');
    spinnerOverlay.classList.add('d-none');
    contentContainer.classList.remove('d-none');
    header.classList.remove('d-none');
    button.classList.remove('d-none');
}

// render each Pokemon Card
async function renderAll(amount) {
    if (amount === renderCount) return;
    if (amount > renderCount) {
        pokemonCardsForRender(amount);
    } else {
        removeCards(amount);
        renderCount = amount;
    }
}

async function pokemonCardsForRender(amount){
    let container = document.getElementById('content');
    for (let i = renderCount; i <= amount - 1; i++) {
        let typesForPkm = await getDataTypes(i);
        let imgSrc = mainDatas[i].sprites.other.home.front_default;
        let pkmNames = mainDatas[i].name;
        let pkmTypes = await typesHtml(typesForPkm);
        let background = typesForPkm[0];
        let cardHtml = pokeCardTemplate(imgSrc, i, pkmNames, background);
        container.insertAdjacentHTML('beforeend', cardHtml);
        let typesContainer = document.getElementById('types' + i);
        typesContainer.innerHTML = pkmTypes;
        renderCount++;
    } 
}

function loadFilteredPokemons() {
    filteredPkm = [];
    for(let i = 1; i <= pokemonCount; i++) {
        let rawData = mainDatas[i - 1];
        let nameData = mainDatas[i - 1].name;
        let cleanTypes = rawData.types.map(t => t.type.name);
        let pkmObject = {
            id: i,
            name: nameData,
            types: cleanTypes,
        }
        filteredPkm.push(pkmObject)
    }
    return filteredPkm;
}

// render filtered Pokemon Cards
function renderFilteredPkm() {
    let query = document.getElementById('search').value || '';
    let trimmed = query.trim();
    if (query === lastQuerry) {
        return
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
        updatePokemonView(query, trimmed);
    },750);
}

function updatePokemonView(query, trimmed){
    if (trimmed.length < 3) {
        lastQuerry = trimmed;
        renderCount = 0;
        document.getElementById('content').innerHTML = '';
        const amount = pkmrenderAmount();
        renderAll(amount);
        return;
      }
    lastQuerry = query;
    renderList(filterPkm(query));
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
        return filteredPkm;
    }
    return filteredPkm.filter(pkm => {
        let nameMatch = pkm.name.toLowerCase().includes(input);
        let typeMatch = pkm.types.some(type => type.toLowerCase().includes(input));
        return nameMatch || typeMatch;
    });
}

function removeCards(amount){
    for(let i = renderCount; i > amount - 1; i--) {
        let card = document.getElementById('pkm-card-' + i);
        if (card) card.remove();
    }
}

// rendering of Type Image
function typesHtml(typesForPkm) {
    let pkmTypesHtml = " ";
    for (let index = 0; index < typesForPkm.length; index++){
        let typeForPkm = typesForPkm[index];
        pkmTypesHtml += '<img class="pkm-type-img" src="imgs/' + typeForPkm + '.png" alt="' + typeForPkm + '">'
    }
    return pkmTypesHtml;
}

// how much pokemon to render (Input)
function pkmrenderAmount() {
    let amount = document.getElementById('render-amount').value;
    amount = Number(amount);
    if(amount <= 1) {
        amount = 1;
        return amount;
    }
    return amount;
}

// for load more Button
function renderMoreCards() {
    let input = document.getElementById('render-amount');
    let numberOfCards = input.value
    numberOfCards = Number(numberOfCards)
    let newInputValue = numberOfCards + 20;
    if (newInputValue > 1025){
        newInputValue = 1025;
        input.value = newInputValue;
        inputDelay();
        return
    }
    input.value = newInputValue;
        renderAll(newInputValue);
}

// loading List for Filter Function
function errorList(list) {
    let container = document.getElementById('content');
    container.innerHTML = '';
    if (!list || list.length === 0) {
      container.innerHTML = `<p style="padding:12px; color: white;">No Results!</p>`;
      return;
    }
  }

  function renderList(list) {
    let container = document.getElementById('content');
    errorList(list)
    for (let index = 0; index < list.length; index++) {
      let p = list[index];
      let i = p.id -1;
      let imgSrc = mainDatas[i].sprites.other.home.front_default;          
      let pkmTypesHtml = typesHtml(p.types);
      let background = p.types[0];
      let cardHtml = pokeCardTemplate(imgSrc, i, p.name, background);
      container.insertAdjacentHTML('beforeend', cardHtml);
      let typesContainer = document.getElementById('types' + i);
      if (typesContainer) typesContainer.innerHTML = pkmTypesHtml;
    }
  }



