//Created IIFE with getAll and add functions
let pokemonRepository = function () {
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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  };
})();

//Retrieve Pokemon Array from IIFE
let pokemonList = pokemonRepository.getAll();
//Created a forEach loop for pokemonList
pokemonList.forEach(function (pokemon) {
  if (pokemon.height > 2) {
    document.write(pokemon.name + "  " + "(height:" + "  " + pokemon.height + " ) " + "- Wow. That's big!" + "<br>"); //condition for pokemon with the height > 2
  } else {
    document.write(pokemon.name + "  " + "(height:" + "  " + pokemon.height + " ) " + "<br>");
  }
});
