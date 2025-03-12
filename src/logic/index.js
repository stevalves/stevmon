const pokelist = document.getElementById("poke-list");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let index = 1;
let pokemonsPerPage = 12;

const getPokeTypes = (list) => {
  let ans = [];
  for (const item of list) {
    ans.push(`<li>${item.type.name.toUpperCase()}</li> `);
  }
  return ans.join(" - ");
};

const getInfoData = async (index, pokemonsPerPage) => {
  pokelist.innerHTML = "";
  for (let i = index; i <= pokemonsPerPage; i++) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await res.json();
      let pokecard = document.createElement("li");
      pokecard.addEventListener("click", () => {
        window.location.href = `/src/pages/pokemon.html?pokemon=${data.name}`;
      });
      pokecard.className = "poke-card";
      pokecard.innerHTML = `
            <figcaption>
                <img src="${
                  data.sprites.other.showdown["front_default"]
                }" alt="${data.name}" />
              </figcaption>
              <div class="poke-content">
                <div>
                  <h3>${data.name}</h3>
                  <div class="poke-data">
                    <p>#${String(data.id).padStart(3, "0")}</p>
                    <p>Exp: ${data["base_experience"]}</p>
                  </div>
                </div>
                <!-- data.types -->
                <ul class="types">
                    ${getPokeTypes(data.types)}
                </ul>
            </div>
      `;
      prevButton.disabled = index == 1;
      pokelist.appendChild(pokecard);
    } catch (er) {
      console.error(er);
    }
  }
};

prevButton.addEventListener("click", () => {
  if (index != 1) {
    index -= 12;
    pokemonsPerPage -= 12;
    getInfoData(index, pokemonsPerPage);
  }
});

nextButton.addEventListener("click", () => {
  index += 12;
  pokemonsPerPage += 12;
  getInfoData(index, pokemonsPerPage);
});

const goSearch = (e) => {
  e.preventDefault()
  const inputValue = document.getElementById("pokemon").value
  console.log(e)
  window.location.href = `/src/pages/pokemon.html?pokemon=${inputValue}`
}

addEventListener("DOMContentLoaded", () => getInfoData(index, pokemonsPerPage));
