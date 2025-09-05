
let mainUrl = `https://pokeapi.co/api/v2/pokemon/`;
let mainUrlV2 = `https://pokeapi.co/api/v2/type/`;



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

async function getData(i) {
    let pkmTypeNames = [];
    let response = await fetch(mainUrl + i)   
    let responseJson = await response.json();
    let pkmTp = responseJson.types;
    for (let index = 0; index < pkmTp.length; index ++) {
        
    let pkmType = pkmTp[index].type.name;     //  .types[1].type.name
    pkmTypeNames.push(pkmType); 
    
    } 
    
    return pkmTypeNames;
}
