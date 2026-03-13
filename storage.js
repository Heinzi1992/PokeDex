const mainUrl = `https://pokeapi.co/api/v2/pokemon/`;
const mainUrlV2 = `https://pokeapi.co/api/v2/type/`;
const pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/`;
let speciesDatas = [];
let stats = [];
let mainDatas = [];
let evoChainData = [];
let evoChain = [];
let evoImgs = [];

/**
 * Loads all Pokémon with all information and pushes them into mainDatas.
 * @param {number} pokemonValue - The number of Pokémon to load.
 * @returns {Promise<Array>} The array of main Pokémon data.
 */
async function fetchMainData(pokemonValue) {
  mainDatas = [];
  let pokemonPromises = [];
  try {
    for (let i = 1; i < pokemonValue + 1; i++) {
      let url = mainUrl + i;
      let promise = fetch(url).then((response) => response.json());
      pokemonPromises.push(promise);
    }
    mainDatas = await Promise.all(pokemonPromises);
  } catch {
    console.log("dowload main datas failed");
  }
  return mainDatas;
}

/**
 * Gets the type names for a specific Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @returns {Promise<Array<string>>} The array of type names.
 */
async function getDataTypes(i) {
  let pkmTypeNames = [];
  let pkmTp = mainDatas[i].types;

  for (let index = 0; index < pkmTp.length; index++) {
    let pkmType = pkmTp[index].type.name;
    pkmTypeNames.push(pkmType);
  }
  return pkmTypeNames;
}

/**
 * Gets the ability names for a specific Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @returns {Promise<Array<string>>} The array of ability names.
 */
async function getDataAbilities(i) {
  let allAbilities = [];
  let dataAbilities = mainDatas[i].abilities;

  for (let index = 0; index < dataAbilities.length; index++) {
    let ability = dataAbilities[index].ability.name;
    allAbilities.push(ability);
  }
  return allAbilities;
}

/**
 * Gets all base stats for a specific Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @returns {Promise<Array<number>>} The array of base stats.
 */
async function getAllStats(i) {
  stats = [];
  let allStats = mainDatas[i].stats;

  for (let index = 0; index < allStats.length; index++) {
    let element = allStats[index].base_stat;
    stats.push(element);
  }
  return stats;
}

/**
 * Loads and renders the evolution chain for the current Pokémon.
 * @returns {Promise<void>}
 */
async function getEvoChain() {
  await fetchEvoChainData();
  getEvoChainNames();
  getEvoImgs();
  renderEvoImgs();
}

/**
 * Fetches the species data for a specific Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @returns {Promise<Array>} The array of species data.
 */
async function fetchSpeciesData(i) {
  speciesDatas = [];
  let speciesPromises = [];
  let url = pokemonSpecies + (i + 1);
  try {
    let promise = fetch(url).then((response) => response.json());
    speciesPromises.push(promise);
    speciesDatas = await Promise.all(speciesPromises);
  } catch {
    console.log("No Species Datas");
  }
  return speciesDatas;
}

/**
 * Fetches the evolution chain data for the current species.
 * @returns {Promise<Array>} The array of evolution chain data.
 */
async function fetchEvoChainData() {
  evoChainData = [];
  let evoPromise = [];
  let url = speciesDatas[0].evolution_chain.url;
  try {
    let promise = fetch(url).then((response) => response.json());
    evoPromise.push(promise);
    evoChainData = await Promise.all(evoPromise);
  } catch {
    console.log("No Evo Chain Datas");
  } finally {
    return evoChainData;
  }
}

/**
 * Gets the evolution chain names and stores them in evoChain.
 * @returns {Array<string>} The array of evolution chain names.
 */
function getEvoChainNames() {
  evoChain = [];
  let firstEvolution = evoChainData[0].chain.species.name;
  let secondEvolution = evoChainData[0].chain.evolves_to[0];
  evoChain.push(firstEvolution);
  if (secondEvolution == undefined) return evoChain;
  else evoChain.push(secondEvolution.species.name);
  let thirdEvolution = evoChainData[0].chain.evolves_to[0].evolves_to[0];
  if (thirdEvolution == undefined) return evoChain;
  else evoChain.push(thirdEvolution.species.name);
}

/**
 * Gets the evolution images for the current evolution chain.
 * @returns {Array<string>} The array of evolution image URLs.
 */
function getEvoImgs() {
  evoImgs = [];
  for (let i = 0; i < evoChain.length; i++) {
    for (let index = 0; index < mainDatas.length; index++) {
      let evoName = evoChain[i];
      let name = mainDatas[index].name;
      let evoImgSrc = mainDatas[index].sprites.other.home.front_default;
      if (evoName == name) {
        evoImgs.push(evoImgSrc);
        break;
      }
    }
  }
  return evoImgs;
}
