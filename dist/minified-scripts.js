let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(e){let t=document.querySelector(".modal-body"),n=document.querySelector(".modal-title");n.innerHTML="",t.innerHTML="";let o=document.createElement("h1");o.innerText=e.name;let i=document.createElement("img");i.classList.add("modal-img"),i.setAttribute("src",e.imageUrl);let r=document.createElement("p");r.innerText="Pokemon height: "+e.height;let a=document.createElement("p");a.innerHTML="Pokemon types: "+e.types.map(({type:e})=>e.name).join(", "),n.appendChild(o),t.appendChild(i),t.appendChild(r),t.appendChild(a)}function o(t){e.push(t)}function i(e){pokemonRepository.loadDetails(e).then(function(){n(e)})}return{add:o,getAll:function(){return e},addListItem:function(e){let t=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("list-group-item");let o=document.createElement("button");o.classList.add("btn"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#modal"),o.innerText=e.name,o.classList.add("button-class"),n.appendChild(o),t.appendChild(n),o.addEventListener("click",function(){i(e)})},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){o({name:e.name,detailsUrl:e.url,imageUrl:e.myImage})})}).catch(function(e){console.error(e)})},loadDetails:function(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types}).catch(function(e){console.error(e)})},showDetails:i,showModal:n}}(),pokemonList=pokemonRepository.getAll();pokemonRepository.loadList().then(function(){pokemonList.forEach(function(e){pokemonRepository.addListItem(e)})});let searchBar=document.getElementById("searchBar");function filterAndDisplayPokemons(e){let t=pokemonList.filter(function(t){return t.name.toLowerCase().includes(e)});clearPokemonList(),""===e?pokemonList.forEach(function(e){pokemonRepository.addListItem(e)}):t.forEach(function(e){pokemonRepository.addListItem(e)})}function clearPokemonList(){document.querySelector(".pokemon-list").innerHTML=""}searchBar.addEventListener("input",function(){filterAndDisplayPokemons(this.value.toLowerCase())});
