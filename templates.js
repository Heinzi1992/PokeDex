
function pokeCardTemplate(imgSrc, i, pkmNames, background) {
    return `
    
        <div id="pkm-card-${i}" class="pkm-card" onclick="showAndCloseDialog(${(i)})">
            
            <h2>#${i} ${pkmNames}</h2>
            
            <div class="pkm-img-container pkm-img-background-${background}" id="img-container">
                <img id="pkm-img" class="pkm-img" src="${imgSrc}" alt=""></img>
            </div>
            <div class="types" id="types${i}">
            
                 
            </div>
            
        </div>
    
    `
}

function pkmTypeImgTemplate(typeImgSrc) {
    return `
    
    <img id="type-img" src="${typeImgSrc}" alt="">

    `
}

function dialogTemplate(i, pkmNames, background, imgSrc) {
    return `
        <h2 class="ta-center mt-10px mb-10px">#${i} ${pkmNames}</h2>
        <div class="pkm-img-container pkm-img-background-${background}" id="img-container">
                <img id="pkm-img" class="pkm-img" src="${imgSrc}" alt=""></img>
        </div>
    `
}