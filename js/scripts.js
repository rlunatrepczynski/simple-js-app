
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

//Created a for loop for pokemonList
for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")");
  if (pokemonList[i].height > 2) {
    document.write(' - Wow! That\'s a big one!');//created conditional for pokemon height
  }
}
