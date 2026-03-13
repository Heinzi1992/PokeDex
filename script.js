let timer;
let renderCount = 0;
let filteredPkm = [];
let lastQuerry = "";
let amount = 20;
const pokemonCount = 1025; // 1025=all  386=3Gens
const button = document.getElementById("load-more-button");
const spinnerOverlay = document.getElementById("loading-spinner-container");
const contentContainer = document.getElementById("content");
const header = document.getElementById("header");

/**
 * Initializes the application by loading and rendering the initial Pokémon data.
 * @returns {Promise<void>}
 */
async function init() {
  try {
    await fetchMainData(amount);
    await renderAll(amount);
  } catch {
    console.log("fetch Main Data failed");
  }
  fetchAllData();
}

/**
 * Fetches all Pokémon data and loads the filtered Pokémon list.
 * @returns {Promise<void>}
 */
async function fetchAllData() {
  await fetchMainData(pokemonCount);
  loadFilteredPokemons();
}

/**
 * Hides the loading spinner and shows the Pokémon cards and UI elements.
 */
function closeLoadingSpinnerShowCards() {
  spinnerOverlay.classList.add("d-none");
  contentContainer.classList.remove("d-none");
  header.classList.remove("d-none");
  button.classList.remove("d-none");
}

/**
 * Shows the loading spinner and hides the Pokémon cards and UI elements.
 */
function openLoadingSpinner() {
  spinnerOverlay.classList.remove("d-none");
  contentContainer.classList.add("d-none");
  header.classList.add("d-none");
  button.classList.add("d-none");
}

/**
 * Hides the loading spinner and shows the filtered Pokémon cards and UI elements.
 */
function closeLoadingSpinnerFilter() {
  spinnerOverlay.classList.add("d-none");
  contentContainer.classList.remove("d-none");
  header.classList.remove("d-none");
}

/**
 * Renders all Pokémon cards up to the given amount.
 * @param {number} amount - The number of Pokémon to render.
 * @returns {Promise<void>}
 */
async function renderAll(amount) {
  if (amount === renderCount) {
    return;
  } else {
    await pokemonCardsForRenderAll(amount);
  }
}

/**
 * Renders Pokémon cards and waits for all images to load.
 * @param {number} amount - The number of Pokémon to render.
 * @returns {Promise<void>}
 */
async function pokemonCardsForRenderAll(amount) {
  let allPromises = [];
  for (let i = renderCount; i <= amount - 1; i++) {
    let types = await getDataTypes(i);
    let imgSrc = mainDatas[i].sprites.other.home.front_default;
    let pkmName = mainDatas[i].name;
    allPromises.push(...getPkmImagePromises(imgSrc, types));
    renderSingleCard(i, imgSrc, types, pkmName);
    renderCount++;
  }
  await Promise.all(allPromises);
  closeLoadingSpinnerShowCards();
}

/**
 * Creates a promise that resolves when the image is loaded or fails.
 * @param {string} src - The image source URL.
 * @returns {Promise<void>}
 */
function createImagePromise(src) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/**
 * Gets promises for loading the main and type images for a Pokémon.
 * @param {string} imgSrc - The main image source URL.
 * @param {Array<string>} typesForPkm - The types of the Pokémon.
 * @returns {Array<Promise<void>>} Array of image loading promises.
 */
function getPkmImagePromises(imgSrc, typesForPkm) {
  let promises = [createImagePromise(imgSrc)];
  for (let index = 0; index < typesForPkm.length; index++) {
    let typeSrc = "imgs/" + typesForPkm[index] + ".png";
    promises.push(createImagePromise(typeSrc));
  }
  return promises;
}

/**
 * Renders a single Pokémon card and its types.
 * @param {number} i - The index of the Pokémon.
 * @param {string} imgSrc - The image source URL.
 * @param {Array<string>} typesForPkm - The types of the Pokémon.
 * @param {string} pkmName - The name of the Pokémon.
 */
function renderSingleCard(i, imgSrc, typesForPkm, pkmName) {
  let pkmTypes = typesHtml(typesForPkm);
  let background = typesForPkm[0];
  let cardHtml = pokeCardTemplate(imgSrc, i, pkmName, background);
  contentContainer.insertAdjacentHTML("beforeend", cardHtml);
  document.getElementById("types" + i).innerHTML = pkmTypes;
}

/**
 * Loads all Pokémon into the filteredPkm array for filtering.
 * @returns {Array<Object>} The filtered Pokémon array.
 */
function loadFilteredPokemons() {
  filteredPkm = [];
  for (let i = 1; i <= pokemonCount; i++) {
    let rawData = mainDatas[i - 1];
    let nameData = mainDatas[i - 1].name;
    let cleanTypes = rawData.types.map((t) => t.type.name);
    let pkmObject = {
      id: i,
      name: nameData,
      types: cleanTypes,
    };
    filteredPkm.push(pkmObject);
  }
  return filteredPkm;
}

/**
 * Renders filtered Pokémon cards based on the search input.
 */
function renderFilteredPkm() {
  let query = document.getElementById("search").value || "";
  let trimmed = query.trim();
  if (query.length < 3) button.classList.remove("d-none");
  if (query === lastQuerry) return;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    openLoadingSpinner();
    await updatePokemonView(query, trimmed);
  }, 750);
}

/**
 * Updates the Pokémon view based on the search query.
 * @param {string} query - The search query.
 * @param {string} trimmed - The trimmed search query.
 * @returns {Promise<void>}
 */
async function updatePokemonView(query, trimmed) {
  if (trimmed.length < 3) {
    lastQuerry = trimmed;
    renderCount = 0;
    document.getElementById("content").innerHTML = "";
    renderAll(amount);
    return;
  }
  lastQuerry = query;
  await renderList(filterPkm(query));
  closeLoadingSpinnerFilter();
}

/**
 * Delays the rendering of all Pokémon cards for the search function.
 */
function inputDelay() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let amount = pkmrenderAmount();
    renderAll(amount);
  }, 750);
}

/**
 * Filters the Pokémon based on the search query.
 * @param {string} query - The search query.
 * @returns {Array<Object>} The filtered Pokémon array.
 */
function filterPkm(query) {
  let input = query.trim().toLowerCase();
  if (input.length < 3) {
    return filteredPkm;
  }
  return filteredPkm.filter((pkm) => {
    let nameMatch = pkm.name.toLowerCase().includes(input);
    let typeMatch = pkm.types.some((type) =>
      type.toLowerCase().includes(input),
    );
    button.classList.add("d-none");
    return nameMatch || typeMatch;
  });
}

/**
 * Returns the HTML for the type images of a Pokémon.
 * @param {Array<string>} typesForPkm - The types of the Pokémon.
 * @returns {string} The HTML string for the type images.
 */
function typesHtml(typesForPkm) {
  let pkmTypesHtml = " ";
  for (let index = 0; index < typesForPkm.length; index++) {
    let typeForPkm = typesForPkm[index];
    pkmTypesHtml +=
      '<img class="pkm-type-img" src="imgs/' +
      typeForPkm +
      '.png" alt="' +
      typeForPkm +
      '">';
  }
  return pkmTypesHtml;
}

/**
 * Renders more Pokémon cards when the load more button is clicked.
 * @returns {Promise<void>}
 */
async function renderMoreCards() {
  openLoadingSpinner();
  let numberOfCards = amount;
  numberOfCards = Number(numberOfCards);
  let newInputValue = numberOfCards + 20;
  if (newInputValue > 1025) {
    newInputValue = 1025;
    input.value = newInputValue;
    inputDelay();
    return;
  }
  amount = newInputValue;
  await renderAll(newInputValue);
}

/**
 * Handles the error display for the filtered Pokémon list.
 * @param {Array<Object>} list - The filtered Pokémon list.
 */
function errorList(list) {
  let container = document.getElementById("content");
  container.innerHTML = "";
  if (!list || list.length === 0) {
    container.innerHTML = `<p style="padding:12px; color: white;">No Results!</p>`;
    button.classList.add("d-none");
    return;
  }
}

/**
 * Renders a list of Pokémon cards from the filtered list.
 * @param {Array<Object>} list - The filtered Pokémon list.
 * @returns {Promise<void>}
 */
async function renderList(list) {
  errorList(list);
  let allPromises = [];
  for (let index = 0; index < list.length; index++) {
    let p = list[index];
    let i = p.id - 1;
    let imgSrc = mainDatas[i].sprites.other.home.front_default;

    allPromises.push(...getPkmImagePromises(imgSrc, p.types));
    renderSingleCard(i, imgSrc, p.types, p.name);
  }
  await Promise.all(allPromises);
}
