//Created IIFE with getAll and add functions
let pokemonRepository = (function () {
  //Created an array for pokemonList
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //modal container
  let modalContainer = document.querySelector(".modal-container");

  function showModal(pokemon) {
    let modal = document.createElement("div");
    modal.classList.add("modal");


    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = 'Pokemon name' + ': ' + pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = 'Pokemon height' + ': ' + pokemon.height;


    let myImage = document.createElement('img');
    myImage.src = item.imageUrl;
    modal.appendChild(myImage);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");
  }

  let dialogPromiseReject;

  function hideModal() {
    let modal = document.querySelector(".modal");
    modal.remove();

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function (event) {
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
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//Retrieve Pokemon Array from IIFE
let pokemonList = pokemonRepository.getAll();
//Created a forEach loop for pokemonList
pokemonRepository.loadList().then(function () {
  pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
