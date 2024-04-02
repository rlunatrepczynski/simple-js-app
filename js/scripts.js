// Created IIFE with getAll and add functions
let pokemonRepository = (function () {
  //Created an array for pokemonList
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function to display modal content
  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    // Creating elements for name, image, height, and types in modal content
    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src', pokemon.imageUrl);

    let heightElement = document.createElement("p");
    heightElement.innerText = 'Pokemon height: ' + pokemon.height;

    let typeElement = document.createElement("p");
    typeElement.innerHTML = 'Pokemon types: ' + pokemon.types.map(({ type }) => type.name).join(', ');

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typeElement);
  }

  // Function to add list item with button for each pokemon
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add('list-group-item');
    let button = document.createElement("button");
    button.classList.add('btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Function to get all pokemons
  function getAll() {
    return pokemonList;
  }

  // Function to add pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Function to load pokemon list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function to load details for a pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function to show details of a pokemon
  function showDetails(item) {
    loadDetails(item).then(function () {
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

// Pagination settings
let pokemonPerPage = 18; // Number of Pokemon per page
let currentPage = 1;

// Function to update pagination buttons
function updatePaginationButtons() {
  document.getElementById('currentPage').textContent = currentPage;
}

// Function to display pokemons for current page
function displayPokemons(startIndex, endIndex) {
  clearPokemonList();
  let pokemonsToDisplay = pokemonList.slice(startIndex, endIndex);
  pokemonsToDisplay.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}

// Function to show current page
function showCurrentPage() {
  let startIndex = (currentPage - 1) * pokemonPerPage;
  let endIndex = startIndex + pokemonPerPage;
  displayPokemons(startIndex, endIndex);
  updatePaginationButtons();
}

// Event listener for previous page button
document.getElementById('prevPageBtn').addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage--;
    showCurrentPage();
  }
});

// Event listener for next page button
document.getElementById('nextPageBtn').addEventListener('click', function () {
  let maxPage = Math.ceil(pokemonList.length / pokemonPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    showCurrentPage();
  }
});

// Function to clear the current Pokemon list display
function clearPokemonList() {
  let pokemonListContainer = document.querySelector(".pokemon-list");
  pokemonListContainer.innerHTML = '';
}

// Event listener for search bar
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

document.addEventListener("DOMContentLoaded", function () {
  // Simulate the delay for demonstration purposes
  setTimeout(function () {
    // Hide the preloader
    document.querySelector(".preloader").style.display = "none";
  }, 2000); // You can adjust the duration as needed

  // Load the Pokemon list
  pokemonRepository.loadList().then(function () {
    showCurrentPage();
  });
});
