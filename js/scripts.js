//  Created IIFE with getAll and add functions
let pokemonRepository = (function () {
  //Created an array for pokemonList
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    //creating element for name in modal content
    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    //creating img in modal content
    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src', pokemon.imageUrl);

    //creating element for height in modal content
    let heightElement = document.createElement("p");
    heightElement.innerText = 'Pokemon height: ' + pokemon.height;

    let typeElement = document.createElement("p");
    typeElement.innerHTML = 'Pokemon types: ' + pokemon.types.map(({ type }) => type.name).join(', ');

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typeElement);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    //add list-group-item on li elements for Bootstrap
    listpokemon.classList.add('list-group-item');
    let button = document.createElement("button");
    button.classList.add('btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          imageUrl: item.myImage,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal

  };
})();

// Retrieve Pokemon Array from IIFE
let pokemonList = pokemonRepository.getAll();

// Created a forEach loop for pokemonList
pokemonRepository.loadList().then(function () {
  pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Add an event listener to the search bar
let searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', function () {
  // Call a function to filter and display Pokemon based on the search term
  filterAndDisplayPokemons(this.value.toLowerCase());
});

// Function to filter and display Pokemon based on the search term
function filterAndDisplayPokemons(searchTerm) {
  // Get the filtered Pokemon list
  let filteredPokemonList = pokemonList.filter(function (pokemon) {
    return pokemon.name.toLowerCase().includes(searchTerm);
  });

  // Clear the current display
  clearPokemonList();

  // Display the filtered Pokemon list or all Pokemon if the search bar is cleared
  if (searchTerm === '') {
    pokemonList.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  } else {
    filteredPokemonList.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  }
}

// Function to clear the current Pokemon list display
function clearPokemonList() {
  let pokemonListContainer = document.querySelector(".pokemon-list");
  pokemonListContainer.innerHTML = '';
}

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
  loader.style.display = "none";
})
