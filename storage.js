
let mainUrl = `https://pokeapi.co/api/v2/pokemon/`;
let mainUrlV2 = `https://pokeapi.co/api/v2/type/`;




async function fetchJsonData(i) {
    let response = await fetch(mainUrl + i);   
    let responseJson = await response.json();

    return responseJson;
}
async function getDataImg(i) {
    let response = await fetch(mainUrl + i)   // pokemon/?limit=10&offset=0
    let responseJson = await response.json();
    let pkmImage = responseJson.sprites.other.home.front_default;
        
    return pkmImage;    
}

async function getDataName(i) {
    let response = await fetch(mainUrl + i)   
    let responseJson = await response.json();
    let pkmName = responseJson.name;
    
    return pkmName;    
}

async function getDataTypes(i) {
    let pkmTypeNames = [];
    let response = await fetch(mainUrl + i)   
    let responseJson = await response.json();
    let pkmTp = responseJson.types;

    for (let index = 0; index < pkmTp.length; index ++) {
    let pkmType = pkmTp[index].type.name;  
    pkmTypeNames.push(pkmType); 
    } 
    
    return pkmTypeNames;
}

async function getDataAbilities(i) {
    let allAbilities = [];
    let data = await fetchJsonData(i);
    let dataAbilities = data.abilities;
    for (let index = 0; index < dataAbilities.length; index ++) {
        let ability = dataAbilities[index].ability.name;  
        allAbilities.push(ability); 
    }
    
    return allAbilities;
    
}

async function getBaseExperience(i) {
    let data = await fetchJsonData(i);
    let dataExperience = data.base_experience;
    
    return dataExperience;
}

async function getWeight(i) {
    let data = await fetchJsonData(i);
    let dataWeight = data.weight;

    return dataWeight;
}

async function getHeight(i) {
    let data = await fetchJsonData(i);
    let dataHeight = data.height;
    
    return dataHeight;
}



