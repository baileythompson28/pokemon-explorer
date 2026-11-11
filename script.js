const cards = document.getElementById("characterCards");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const first12Btn = document.getElementById("first12Btn");
const showMorePokemonBtn = document.getElementById("showMorePokemonBtn");


//#6
async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) throw new Error("Not found");
  return response.json();
}

function cardTemplate(pokemon) {
  const div = document.createElement("div");
  div.className = "card";
  const stats = pokemon.stats
    .map(
      ({base_stat: value, stat}) => `
        <div>
          <dt>${stat.name.replace("-", " ")}</dt>
          <dd>${value}</dd>
        </div>
      `,
    )
    .join("");

  div.innerHTML = 
    `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>#${pokemon.id} ${pokemon.name}</h3>
    <dl class="card-stats">${stats}</dl>`;
  return div;
}

//#7
function displayPokemon(pokemons) {
  cards.innerHTML = "";
  pokemons.forEach((pokemon) => cards.appendChild(cardTemplate(pokemon)));
}

async function loadPokemon(startId = 1, endId = 12) {
  cards.innerHTML = "loading...";
  const results = [];

  for (let id = startId; id <= endId; id++) {
    try {
      const pokemon = await getPokemon(id);
      results.push(pokemon);
    } catch (error) {
      console.error(error);
    }
  }
  displayPokemon(results);
}

searchBtn.addEventListener("click", async () => {
  const value = searchInput.value.trim().toLowerCase();
  if (!value) {
    loadPokemon();
    return;
  }
  try {
    const pokemon = await getPokemon(value);
    displayPokemon([pokemon]);
  } catch {
    cards.innerHTML = "<p>Pokemon not found</p>";
  }
});

first12Btn.addEventListener("click", () => loadPokemon(1, 12));
showMorePokemonBtn.addEventListener("click", () => loadPokemon(1, 36));
loadPokemon();
