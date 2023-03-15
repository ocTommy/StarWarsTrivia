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

// fetcha karaktärer och lägg till dropdown
async function fetchCharacters() {
  try {
    let response = await fetch('https://swapi.dev/api/people/');
    let data = await response.json();
    data.results.forEach((character, index) => {
      let option = document.createElement('option');
      option.value = character.url;
      option.text = character.name;
      console.log(option.value)
      console.log(character)

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
let showButton = document.querySelector("#show-button");

// hämta Data för valda karaktärer

showButton.addEventListener("click", async function() {
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

// antal filmer

let character1Movies = character1Data.films.length;
let character2Movies = character2Data.films.length;


  //instanser

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


// Appenda valda karaktärer

  let character1Div = document.querySelector(".character1");
  let character1Img = document.createElement("img");
  character1Img.src = character1.pictureUrl;
  character1Img.alt = character1.name;

  let character1Name = document.createElement("h2");
  character1Name.textContent = character1.name;
  character1Div.appendChild(character1Img);
  character1Div.appendChild(character1Name);

  let character2Div = document.querySelector(".character2");
  let character2Img = document.createElement("img");
  character2Img.src = character2.pictureUrl;
  character2Img.alt = character2.name;

  let character2Name = document.createElement("h2");
  character2Name.textContent = character2.name;
  character2Div.appendChild(character2Img);
  character2Div.appendChild(character2Name);

  let showCharactersDiv = document.querySelector(".show-characters");
  showCharactersDiv.appendChild(character1Div);
  showCharactersDiv.appendChild(character2Div);

  
  console.log(character1.pictureUrl)

  let infoButton = document.createElement("button");
  infoButton.innerText = "More info please!";
  let infoButtonDiv = document.querySelector(".info-button")
  infoButtonDiv.appendChild(infoButton);
  let moreInfoDiv = document.querySelector(".more-character-info")
    

  //Appenda mer info om karaktärerna


  infoButton.addEventListener("click", async function(){
    

    let character1Info = document.querySelector(".character1-info");
    character1Info.innerHTML = `
      <h3>${character1.name}</h3>
      <p>Gender: ${character1.gender}</p>
      <p>Height: ${character1.height}</p>
      <p>Mass: ${character1.mass}</p>
      <p>Hair Color: ${character1.hairColor}</p>
      <p>Skin Color: ${character1.skinColor}</p>
      <p>Eye Color: ${character1.eyeColor}</p>
      <p>Movies: ${character1.movies}</p>
    `;
    
    let character2Info = document.querySelector(".character2-info");
    character2Info.innerHTML = `
      <h3>${character2.name}</h3>
      <p>Gender: ${character2.gender}</p>
      <p>Height: ${character2.height}</p>
      <p>Mass: ${character2.mass}</p>
      <p>Hair Color: ${character2.hairColor}</p>
      <p>Skin Color: ${character2.skinColor}</p>
      <p>Eye Color: ${character2.eyeColor}</p>
      <p>Movies: ${character2.movies}</p>
    `;
    
    moreInfoDiv.append(character1Info);
    moreInfoDiv.append(character2Info);
  });
  


});



