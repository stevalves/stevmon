const params = new URLSearchParams(window.location.search);
let pokemon = params.get("pokemon") || 1;

const mainContainer = document.getElementById("main-container");

const getPokeTypes = (list) => {
  let ans = [];
  for (const item of list) {
    ans.push(`<li class="type">${item.type.name.toUpperCase()}</li> `);
  }
  return ans.join(" - ");
};

const getInfoData = async () => {
  mainContainer.innerHTML = "";
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await res.json();
    let detailsPoke = document.createElement("div");
    mainContainer.innerHTML = "";
    detailsPoke.id = "poke-details";
    detailsPoke.innerHTML = `
           <div class="img-container">
            <div class="imgs">
              <img src="${data.sprites.other.showdown["front_default"]}" alt="${
      data.name
    } front" />
              <img src="${data.sprites.other.showdown["back_default"]}" alt="${
      data.name
    } back" />
            </div>
            <div class="sizes">
              <p class="weight">Peso: ${data.weight / 10}kg</p>
              <p class="height">Altura: ${data.height * 10}cm</p>
            </div>
          </div>
          <div class="stats-container">
            <div class="title">
              <h1>${data.name}</h1>
              <h6>#${String(data.id).padStart(3, "0")}</h6>
            </div>
            <ul class="types">
              ${getPokeTypes(data.types)}
            </ul>
          </div>
        `;
    mainContainer.appendChild(detailsPoke);
  } catch (er) {
    console.error(er);
  }
};

addEventListener("DOMContentLoaded", () => getInfoData());
