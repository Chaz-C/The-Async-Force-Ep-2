//jshint esversion: 6
function personReq() {
  contentContainer.innerHTML = '';
  let personObj = JSON.parse(this.responseText);

  let personName = document.createElement('h2');
  personName.id = 'person-name';
  personName.innerHTML = personObj.name;

  let personGender = document.createElement('p');
  personGender.id = 'person-gender';
  personGender.innerHTML = personObj.gender;

  requestHelper(personObj.species[0], speciesReq);

  function speciesReq() {
    let species = JSON.parse(this.responseText).name;

    let personSpecies = document.createElement('p');
    personSpecies.innerHTML = species;

    contentContainer.appendChild(personName);
    contentContainer.appendChild(personGender);
    contentContainer.appendChild(personSpecies);
  }

}

function planetReq() {
  contentContainer.innerHTML = '';
  let planetInfo = JSON.parse(this.responseText);

  let name = document.createElement('h2');
  name.innerHTML = planetInfo.name;

  let terrain = document.createElement('p');
  terrain.innerHTML = planetInfo.terrain;

  let population = document.createElement('p');
  population.innerHTML = planetInfo.population;

  let ul = document.createElement('ul');

  contentContainer.appendChild(name);
  contentContainer.appendChild(terrain);
  contentContainer.appendChild(population);
  contentContainer.appendChild(ul);

  for ( let i = 0; i < planetInfo.films.length; i ++ ) {
    filmsReq(planetInfo.films[i], ul);
  }
}

function starshipReq() {
  contentContainer.innerHTML = '';
  let starShip = JSON.parse(this.responseText);

  let name = document.createElement('h2');
  name.innerHTML = starShip.name;

  let manufacturer = document.createElement('p');
  manufacturer.innerHTML = starShip.manufacturer;

  let shipClass = document.createElement('p');
  shipClass.innerHTML = starShip.starship_class;

  let ul = document.createElement('ul');

  contentContainer.appendChild(name);
  contentContainer.appendChild(manufacturer);
  contentContainer.appendChild(shipClass);
  contentContainer.appendChild(ul);

  for ( let i = 0; i < starShip.films.length; i ++ ) {
    filmsReq(starShip.films[i], ul);
  }
}

function filmsReq(url, element) {
  requestHelper(url, listFilms);

  function listFilms() {
    let film = JSON.parse(this.responseText);

    let filmTitle = document.createElement('li');
    filmTitle.innerHTML = film.title;
    element.appendChild(filmTitle);
  }
}

function requestHelper(url, listener) {
  let newReq = new XMLHttpRequest();
  newReq.open('GET', url);
  newReq.send();
  newReq.onloadend = function() {
    if(newReq.status == 404) {
        contentContainer.innerHTML = '';
        let error = document.createElement('p');
        error.style.background = '#FE6386';
        error.innerHTML = `Error: Fetching resource: ${url} NOT FOUND`;
        contentContainer.appendChild(error);
    } else {
          listener.call(this);
    }
  };
}

function requestButton() {
  let theCase = document.getElementById('resourceType').value;
  let url = 'http://swapi.co/api/';
  let urlId = document.getElementById('resourceId').value;

  switch(theCase) {
    case 'people':
      requestHelper( `${url}people/${urlId}/`, personReq);
      break;
    case 'planets':
      requestHelper( `${url}planets/${urlId}/`, planetReq);
      break;
    case 'starships':
      requestHelper( `${url}starships/${urlId}/`, starshipReq);
      break;
    default:
      break;
  }
}

requestResourceButton.addEventListener("click", requestButton);

resourceId.addEventListener('keypress', function(e) {
  if ( e.keyCode === 13 ) {
    requestButton();
  }
});

resourceType.addEventListener('keypress', function(e) {
  if ( e.keyCode === 13 ) {
    requestButton();
  }
});