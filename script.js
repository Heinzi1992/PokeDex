
function init() {
    
    renderAll();
}



async function renderAll() {
    let container = document.getElementById('test');
    for (let i = 1; i < 2; i++) {
       let imgSrc = await getDataImg(i);
       let pkmNames = await getDataName(i);
       let pkmTypes = await getData(i);
       let cardHtml = pokeCardTemplate(imgSrc, i, pkmNames, pkmTypes);
       container.insertAdjacentHTML('beforeend', cardHtml);
       
    }
}