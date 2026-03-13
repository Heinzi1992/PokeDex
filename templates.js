/**
 * Returns the HTML template for a Pokémon card.
 * @param {string} imgSrc - The image source URL for the Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @param {string} pkmNames - The name of the Pokémon.
 * @param {string} background - The background type for the card.
 * @returns {string} The HTML string for the Pokémon card.
 */
function pokeCardTemplate(imgSrc, i, pkmNames, background) {
  return `
        <div id="pkm-card-${i}" class="pkm-card" onclick="showDialog(${i}), renderDialog(${i}), getAllStats(${i})">
            <h2>#${i + 1} ${pkmNames}</h2>
            <div class="pkm-img-container pkm-img-background-${background}" id="img-container">
                <img id="pkm-img" class="pkm-img" src="${imgSrc}" alt=""></img>
            </div>  
                <div class="types" id="types${i}">              
            </div>
        </div>
    `;
}

/**
 * Returns the HTML template for a Pokémon type image.
 * @param {string} typeImgSrc - The image source URL for the type.
 * @returns {string} The HTML string for the type image.
 */
function pkmTypeImgTemplate(typeImgSrc) {
  return `
    <img id="type-img" src="${typeImgSrc}" alt="">
    `;
}

/**
 * Returns the HTML template for the dialog window of a Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @param {string} pkmNames - The name of the Pokémon.
 * @param {string} background - The background type for the dialog.
 * @param {string} imgSrc - The image source URL for the Pokémon.
 * @returns {string} The HTML string for the dialog window.
 */
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
    `;
}

/**
 * Returns the HTML template for the main values table in the dialog.
 * @param {string} abilities - The abilities of the Pokémon.
 * @param {number} baseExperience - The base experience of the Pokémon.
 * @param {number} weight - The weight of the Pokémon.
 * @param {number} height - The height of the Pokémon.
 * @returns {string} The HTML string for the main values table.
 */
function dialogMainTemplate(abilities, baseExperience, weight, height) {
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
    `;
}
