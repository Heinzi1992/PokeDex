


function init() {
    
    renderAll();
    
}



async function renderAll() {
    let container = document.getElementById('test');
    
    for (let i = 1; i < 152; i++) {
        
        let typesForPkm = await getData(i);
        let imgSrc = await getDataImg(i);
        let pkmNames = await getDataName(i);
        let pkmTypes = await typesPromise(typesForPkm);
        let background = typesForPkm[0]
        let cardHtml = pokeCardTemplate(imgSrc, i, pkmNames, background);
        container.insertAdjacentHTML('beforeend', cardHtml);
        let typesContainer = document.getElementById('types' + i);
        typesContainer.innerHTML = pkmTypes;
       console.log(background);
       
    }
}

async function typesPromise(typesForPkm) {
    // let container = document.getElementById('types');
    let pkmTypesHtml = " ";
    
    for (let index = 0; index < typesForPkm.length; index++){
        let typeForPkm = typesForPkm[index];
        pkmTypesHtml += '<img class="pkm-type-img" src="imgs/' + typeForPkm + '.png" alt="' + typeForPkm + '">'
    }
    console.log(pkmTypesHtml);
    return pkmTypesHtml;
}




// let typeImgContainer = document.getElementById('types');
// console.log(typeImgContainer);
// // let typeImg = getElementById('type-img');
//     let typeImgSrc = pkmTypeNames[index];
//     let pkmTypeImg = pkmTypeImgTemplate(typeImgSrc);
//     // typeImgContainer.innerHTML += pkmTypeImg;
//     console.table(typeImgSrc);
    
//     // return typeImgContainer.innerHTML = pkmTypeImg; 