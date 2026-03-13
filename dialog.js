/**
 * Opens the dialog and loads the species data for the given Pokémon.
 * @param {number} i - The index of the Pokémon whose data should be displayed.
 */
function showDialog(i) {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("body").classList.add("no-scroll");
  fetchSpeciesData(i);
}

/**
 * Closes the dialog and restores body scrolling.
 */
function closeDialog() {
  document.getElementById("overlay").classList.add("d-none");
  document.getElementById("body").classList.remove("no-scroll");
}

/**
 * Removes the border bottom from all data headlines and adds it to the selected one.
 * @param {string} name - The id of the headline to add the border to.
 */
function addBorderBottom(name) {
  dataHeadline = document.getElementsByClassName("all-data-headline");
  for (let i = 0; i < dataHeadline.length; i++) {
    let headline = dataHeadline[i];
    document
      .getElementById(`${headline.id}`)
      .classList.remove("border-bottom-selector");
  }
  document.getElementById(`${name}`).classList.add("border-bottom-selector");
}

/**
 * Renders the dialog window for the selected Pokémon.
 * @param {number} i - The index of the Pokémon to render.
 */
async function renderDialog(i) {
  let container = document.getElementById("dialog-upper-half");
  let typesForPkm = await getDataTypes(i);
  let pkmNames = mainDatas[i].name;
  let pkmTypes = await typesHtml(typesForPkm);
  let background = typesForPkm[0];
  let imgSrc = mainDatas[i].sprites.other.home.front_default;
  let dialogHtml = dialogTemplate(i, pkmNames, background, imgSrc);
  container.innerHTML = dialogHtml;
  let typesContainer = document.getElementById("dialog-types" + i);
  typesContainer.innerHTML = pkmTypes;
  renderDialogValues(i);
}

/**
 * Renders the previous Pokémon dialog. Wraps to the last Pokémon if at the beginning.
 * @param {number} i - The current Pokémon index.
 */
function renderPreviousDialog(i) {
  if (i < 1) {
    i = 1025;
  }
  renderDialog(i - 1);
  fetchSpeciesData(i - 1);
}

/**
 * Renders the next Pokémon dialog. Wraps to the first Pokémon if at the end.
 * @param {number} i - The current Pokémon index.
 */
function renderNextDialog(i) {
  if (i >= pokemonCount - 1) {
    i = 0;
  }
  renderDialog(i + 1);
  fetchSpeciesData(i + 1);
}

/**
 * Renders the main values (abilities, experience, weight, height) in the dialog.
 * @param {number} i - The index of the Pokémon.
 */
async function renderDialogValues(i) {
  const statsNames = document
    .getElementById("stats-names")
    .classList.add("d-none");
  const valuesContainer = document.getElementById("all-dialog-containers");
  valuesContainer.classList.remove(
    "evo-imgs-container",
    "width-250px",
    "resp-stats-bar",
  );
  valuesContainer.innerHTML = "";
  let abilities = await renderAbilities(i);
  let baseExperience = mainDatas[i].base_experience;
  let weight = mainDatas[i].weight;
  let height = mainDatas[i].height;
  let mainValues = dialogMainTemplate(
    abilities,
    baseExperience,
    weight,
    height,
  );
  valuesContainer.innerHTML = mainValues;
}

/**
 * Renders the abilities of the selected Pokémon as a string.
 * @param {number} i - The index of the Pokémon.
 * @returns {Promise<string>} The abilities as a comma-separated string.
 */
async function renderAbilities(i) {
  let abilities = await getDataAbilities(i);
  let pkmAbilitiesHtml = " ";
  for (let i = 0; i < abilities.length; i++) {
    let abilitie = abilities[i];
    if (abilities.length === 1) {
      pkmAbilitiesHtml += `${abilitie} `;
    } else if (i === abilities.length - 1) {
      pkmAbilitiesHtml += `${abilitie} `;
    } else {
      pkmAbilitiesHtml += `${abilitie}, `;
    }
  }
  return pkmAbilitiesHtml;
}

/**
 * Stops event bubbling for the given event.
 * @param {Event} event - The event to stop propagation for.
 */
function stopEventBubbling(event) {
  event.stopPropagation();
}

/**
 * Renders the stats bar and shows the stats names container.
 */
function renderStatsAndStatsnameContainer() {
  renderStatsBar();
  const statsAndStatsnameContainer = document.getElementById(
    "all-dialog-containers",
  );
  const statsNames = document.getElementById("stats-names");
  statsNames.classList.remove("d-none");
}

/**
 * Renders the stats bar for the current Pokémon.
 */
function renderStatsBar() {
  const statsContainer = document.getElementById("all-dialog-containers");
  statsContainer.classList.remove("evo-imgs-container");
  statsContainer.innerHTML = "";
  statsContainer.classList.add("width-250px", "resp-stats-bar");
  for (let index = 0; index < stats.length; index++) {
    let statsBarContainer = document.createElement("div");
    statsBarContainer.id = "my-stats";
    let statBar = document.createElement("div");
    statBar.id = "stats-bar";
    statBar.style.width = stats[index] / 2 + "%";
    statsBarContainer.appendChild(statBar);
    statsContainer.appendChild(statsBarContainer);
  }
}

/**
 * Renders the evolution images in the dialog.
 */
function renderEvoImgs() {
  const statsNames = document
    .getElementById("stats-names")
    .classList.add("d-none");
  const evoContainer = document.getElementById("all-dialog-containers");
  evoContainer.classList.remove("width-250px", "resp-stats-bar");
  evoContainer.innerHTML = "";
  evoContainer.classList.add("evo-imgs-container");
  for (let i = 0; i < evoImgs.length; i++) {
    evoContainer.innerHTML += `<img class="dialog-evo-img" src="${evoImgs[i]}" alt="Evolution Image">`;
  }
}
