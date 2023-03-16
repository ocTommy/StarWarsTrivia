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


// fetcha karaktärer och lägg till dropdown
async function fetchCharacters() {
  try {
    let response = await fetch("https://swapi.dev/api/people/");
    let data = await response.json();
    data.results.forEach((character, index) => {
      let option = document.createElement('option');
      option.value = character.url;
      option.text = character.name;
      console.log("value:", option.value)
      console.log(option.text)

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
let sameAmountMovies = "";

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


// Funktion för att få id från swapi
function getIdFromUrl(url) {
  let id = url.split('/').filter(Boolean).pop();
  console.log("personens id", id);
  return id;
}


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


  

  let infoButton = document.createElement("button");
  infoButton.innerText = "Show more info";
  let infoButtonDiv = document.querySelector(".info-button")
  infoButtonDiv.appendChild(infoButton);
  let moreInfoDiv = document.querySelector(".more-character-info")
    

  //Appenda mer info om karaktärerna


  infoButton.addEventListener("click", () =>{
    
    let character1Info = document.querySelector(".character1-info");
    character1Info.innerHTML = `
      <h3>${character1.name}</h3>
      <p>Gender: ${character1.gender}</p>
      <p>Height: ${character1.height}cm</p>
      <p>Mass: ${character1.mass}kg</p>
      <p>Hair Color: ${character1.hairColor}</p>
      <p>Skin Color: ${character1.skinColor}</p>
      <p>Eye Color: ${character1.eyeColor}</p>
      <p>Movies: ${character1.movies}</p>
    `;
    
    let character2Info = document.querySelector(".character2-info");
    character2Info.innerHTML = `
      <h3>${character2.name}</h3>
      <p>Gender: ${character2.gender}</p>
      <p>Height: ${character2.height}cm</p>
      <p>Mass: ${character2.mass}kg</p>
      <p>Hair Color: ${character2.hairColor}</p>
      <p>Skin Color: ${character2.skinColor}</p>
      <p>Eye Color: ${character2.eyeColor}</p>
      <p>Movies: ${character2.movies}</p>
    `;
    
    moreInfoDiv.append(character1Info);
    moreInfoDiv.append(character2Info);


    console.log("riktig", character1, character2)

    let compareButton = document.createElement("button");
    compareButton.innerText = "Compare characters";
    let comparedButtonDiv = document.querySelector(".compare-button")
    comparedButtonDiv.appendChild(compareButton);


    //funktioner för att jämföra egenskaper

    function getTallestCharacter(character1, character2) {
      if (parseInt(character1.height) > parseInt(character2.height)) {
        return character1;
      } else {
        return character2;
      }
    }
    
    function getHeaviestCharacter(character1, character2) {
      if (parseInt(character1.mass) > parseInt(character2.mass)) {
        return character1;
      } else {
        return character2;
      }
    }
    
  

    function getCharacterWithMostMovies(character1, character2) {
      if (character1.movies > character2.movies) {
        return character1;
      } else if (character1.movies == character2.movies){
        return sameAmountMovies = "Both characters have same amount of movies!!"
      } else {
        return character2;
      }
    }


    function compareEyeColor(character1, character2){
      if (character1.eyeColor === character2.eyeColor){
     return eyeColorMatch = true;  
    } else {
      return eyeColorMatch = false;
    }}

    function compareSkinColor(character1, character2){
      if (character1.skinColor === character2.skinColor){
        return skinColorMatch = true;
      } else {
        return skinColorMatch = false;
      }
    }


    function compareHairColor(character1, character2){
      if (character1.HairColor === character2.HairColor){
        return HairColorMatch = true;
      } else {
        return HairColorMatch = false;
      }
    }

    function compareGender(character1, character2){
      if (character1.gender === character2.gender){
        return genderMatch = true;
      } else {
        return genderMatch = false;
      }
    }
    
  

    compareButton.addEventListener("click", () => {

      let genderMatch = compareGender(character1,character2);
      let hairColorMatch = compareHairColor(character1, character2);
      let skinColorMatch = compareSkinColor(character1, character2);
      let eyeColorMatch = compareEyeColor(character1, character2);
      let tallestCharacter = getTallestCharacter(character1, character2);
      let heaviestCharacter = getHeaviestCharacter(character1, character2);
      let characterWithMostMovies = getCharacterWithMostMovies(character1, character2);
      console.log(character1.height)
    
      const results = document.querySelector(".results");
      results.innerHTML = `
        <p>Gender match: ${genderMatch}</p>
        <p>Tallest character: ${tallestCharacter.name}</p>
        <p>Heaviest character: ${heaviestCharacter.name}</p>
        <p>Hair color match: ${hairColorMatch}</p>
        <p>Skin color match: ${skinColorMatch}</p>
        <p>Eye color match: ${eyeColorMatch}</p>
        <p>Character with most movies: ${sameAmountMovies ? sameAmountMovies : characterWithMostMovies.name}</p>
      `;
    });
    

  });
  
});



