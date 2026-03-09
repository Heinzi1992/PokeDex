
function pokeCardTemplate(imgSrc, i, pkmNames, background) {
    return `
        <div id="pkm-card-${i}" class="pkm-card" onclick="showDialog(${(i)}), renderDialog(${(i)}), getAllStats(${(i)})">
            <h2>#${i + 1} ${pkmNames}</h2>
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
        <section id="prev-and-next-buttons-dialog-container">
            <button class="button-prev-next-dialog" onclick="renderPreviousDialog(${i})">< Previous</button>
            <button class="button-prev-next-dialog" onclick="renderNextDialog(${i})">Next ></button>
        </section>
        <h2 class="h2-dialog ta-center mt-10px mb-10px">#${i + 1} ${pkmNames}</h2>
        <div class="pkm-img-dialog pkm-img-background-${background}" id="img-container">
                <img id="pkm-img" class="pkm-img-dialog-size" src="${imgSrc}" alt=""></img>
        </div>
        <div class="types" id="dialog-types${i}">
        </div>
        <section id="stats-selection"> 
            <section> <h3 id="values" class="main-selection selector border-bottom-selector all-data-headline" onclick="renderDialogValues(${i}), addBorderBottom('values')">main</h3> </section>
            <section> <h3 id="stats" class="stats-selection selector all-data-headline" onclick="addBorderBottom('stats'), renderStatsAndStatsnameContainer(${i})">stats</h3> </section>
            <section> <h3 id="evo-chain" class="evo-selection selector all-data-headline" onclick="getEvoChain(), addBorderBottom('evo-chain')">evo chain</h3> </section>
        </section>
    `
}

function dialogMainTemplate(abilities, baseExperience, weight, height){
    return `
    <table>
    <tr> 
        <td>Height</td>
        <td class="td-center-width">:<td/>
        <td class="td-value-padding-top"> ${height}0 cm</td>
    </tr>
    <tr> 
        <td>Weight</td>
        <td class"td-center-width">:<td/>
        <td class="td-value-padding-top"> ${weight} kg</td>
    </tr>
    <tr> 
        <td>Base experience</td>
        <td class"td-center-width">:<td/>
        <td class="td-value-padding-top"> ${baseExperience}</td>
    </tr>
    <tr> 
        <td>Abilities</td>
        <td class"td-center-width">:<td/>
        <td class="td-value-padding-top"> ${abilities}</td>
    </tr>
   </table>
    `
}
