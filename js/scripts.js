
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

//Created a forEach loop for pokemonList
pokemonList.forEach(function (pokemon) {
  if (pokemon.height > 2) {
    document.write(pokemon.name + "  " + "(height:" + "  " + pokemon.height + " ) " + "- Wow. That's big!" + "<br>"); //condition for pokemon with the height > 2
  } else {
    document.write(pokemon.name + "  " + "(height:" + "  " + pokemon.height + " ) " + "<br>");
  }
});
