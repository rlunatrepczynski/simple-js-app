//Created IIFE with getAll and add functions
let pokemonRepository = (function () {
  //Created an array for pokemonList
  let pokemonList = [
    {
      name: "Squirtle",
      height: 0.5,
      types: ['water']
    },
    {
      name: "Snorlax",
      height: 2.1,
      types: ['normal']
    },
    {
      name: "Gengar",
      height: 1.5,
      types: ['ghost', 'poison']
    }
  ];

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

//Retrieve Pokemon Array from IIFE
let pokemonList = pokemonRepository.getAll();
//Created a forEach loop for pokemonList
pokemonList.forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
