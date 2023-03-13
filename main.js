//Character Class

class Character {
  constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies, pictureUrl) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.movies = movies;
    this.pictureUrl = pictureUrl;
  }
}

// Funktion för att få id från swapi
function getIdFromUrl(url) {
  let id = url.split('/').filter(Boolean).pop();
  return id;
}

// fetcha karaktärer
async function fetchCharacters() {
  try {
    let response = await fetch('https://swapi.dev/api/people/');
    let data = await response.json();
    data.results.forEach((character, index) => {
      let option = document.createElement('option');
      option.value = character.url;
      option.text = character.name;
      let img = document.createElement('img');
      img.src = `https://starwars-visualguide.com/assets/img/characters/${getIdFromUrl(character.url)}.jpg`;
      img.alt = character.name;
      option.prepend(img);

      if (index % 2 === 0) {
        dropdown1.add(option);
      } else {
        dropdown2.add(option);
      }  
    });  
  } catch (error) {
    console.error(error);
  }  
}  

fetchCharacters();


let dropdown1 = document.querySelector("#characters1");
let dropdown2 = document.querySelector("#characters2");
let compareButton = document.querySelector("#compare-button");

compareButton.addEventListener("click", async function() {
  let character1Url = dropdown1.value;
  let character2Url = dropdown2.value;

  if (!character1Url || !character2Url) {
    alert("Please select two characters.");
    return;
  }

  let character1Response = await fetch(character1Url);
  let character2Response = await fetch(character2Url);
  let character1Data = await character1Response.json();
  let character2Data = await character2Response.json();

  let character1Movies = await Promise.all(character1Data.films.map(async (filmUrl) => {
    let filmResponse = await fetch(filmUrl);
    let filmData = await filmResponse.json();
    return filmData.title;
  }));

  let character2Movies = await Promise.all(character2Data.films.map(async (filmUrl) => {
    let filmResponse = await fetch(filmUrl);
    let filmData = await filmResponse.json();
    return filmData.title;
  }));

  let character1 = new Character(
    character1Data.name,
    character1Data.gender,
    character1Data.height,
    character1Data.mass,
    character1Data.hair_color,
    character1Data.skin_color,
    character1Data.eye_color,
    character1Movies,
    `https://starwars-visualguide.com/assets/img/characters/${getIdFromUrl(character1Url)}.jpg`
  );

  let character2 = new Character(
    character2Data.name,
    character2Data.gender,
    character2Data.height,
    character2Data.mass,
    character2Data.hair_color,
    character2Data.skin_color,
    character2Data.eye_color,
    character2Movies,
    `https://starwars-visualguide.com/assets/img/characters/${getIdFromUrl(character2Url)}.jpg`
  );

  console.log(character1, character2);

  let character1Div = document.createElement('div');
  let character1Img = document.createElement('img');
  character1Img.src = character1.pictureUrl;
  character1Img.alt = character1.name;

  let character1Name = document.createElement('h2');
  character1Name.textContent = character1.name;
  character1Div.appendChild(character1Img);
  character1Div.appendChild(character1Name);

  let character2Div = document.createElement('div');
  let character2Img = document.createElement('img');
  character2Img.src = character2.pictureUrl;
  character2Img.alt = character2.name;

  let character2Name = document.createElement('h2');
  character2Name.textContent = character2.name;
  character2Div.appendChild(character2Img);
  character2Div.appendChild(character2Name);

  let comparisonDiv = document.createElement('div');
  comparisonDiv.appendChild(character1Div);
  comparisonDiv.appendChild(character2Div);

  document.body.appendChild(comparisonDiv);

  console.log(character1.pictureUrl)
});



