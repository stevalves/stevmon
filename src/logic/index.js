const pokelist = document.getElementById("poke-list");

const getPokeTypes = (list) => {
  let ans = [];
  for (const item of list) {
    ans.push(`<li>${item.type.name.toUpperCase()}</li> `);
  }
  return ans.join(" - ");
};

const getInfoData = async () => {
  for (let i = 1; i <= 12; i++) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await res.json();
      let pokecard = document.createElement("li");
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
      pokelist.appendChild(pokecard);
    } catch (er) {
      console.error(er);
    }
  }
};

addEventListener("DOMContentLoaded", () => getInfoData());
