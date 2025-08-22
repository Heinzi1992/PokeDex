
function pokeCardTemplate(imgSrc, i, pkmNames, pkmTypes) {
    return `
    
        <div id="pkm-card" class="pkm-card">
            <h2 class="ta-center mt-10px mb-10px">#${i} ${pkmNames}</h2>
            <div class="pkm-img-container" id="img-container">
                <img id="pkm-img" class="pkm-img" src="${imgSrc}" alt=""></img>
            </div>
            <div class="types">
            ${pkmTypes}
                 <img src="" alt="">
            </div>
            
        </div>
    
    `
}