const gameContainer = document.getElementById("game");
let firstChoice;
let secondChoice;
let cardsFlipped = 0;

////////////////////////////// ⌄⌄ starter code ⌄⌄ ////////////////////////////////

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

////////////////////////////// ^^ starter code ^^ ////////////////////////////////

function handleCardClick(event) {
  cardsFlipped ++

  if (cardsFlipped > 2) {
    alert('You may only select two cards at a time')
    return;
  }

  if (cardsFlipped === 1) {
    firstChoice = event.target;
    firstChoice.style.backgroundColor = event.target.classList.value;
  } else if (cardsFlipped === 2) {

    if (event.target.style.backgroundColor !== '') {
      event.target.style.backgroundColor = '';
      alert('Please select two different cards');
      cardsFlipped = 0;
      return;
    }

    else if (event.target.style.backgroundColor === '') {

    secondChoice = event.target;
    secondChoice.style.backgroundColor = event.target.classList.value;

    if (firstChoice.style.backgroundColor === secondChoice.style.backgroundColor) {
      firstChoice.removeEventListener('click', handleCardClick);
      secondChoice.removeEventListener('click', handleCardClick);

      const divArr = Array.from(document.querySelectorAll('#game div'));

      if (divArr.every(function(val) {
        return val.style.backgroundColor === "red" || val.style.backgroundColor === "blue" || val.style.backgroundColor === "green" || val.style.backgroundColor === "orange" || val.style.backgroundColor === "purple" 
      })) {alert("Congrats! You've won!")};
  
      cardsFlipped = 0;
      return;
    }

    else if (firstChoice.style.backgroundColor !== secondChoice.style.backgroundColor) {
      setTimeout(function() {
          firstChoice.style.backgroundColor = "";
          secondChoice.style.backgroundColor = "";
        cardsFlipped = 0;
        return
        }
      , 1000 )}
    } 
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


