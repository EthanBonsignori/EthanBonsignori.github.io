// Declare hangman object
const hangman = {
  wins: 0,      // Number of times the user successfully guessed the word
  losses: 0,    // Number of times the user ran out of guesses
  guesses: 8,  // User's guesses remaining
  
  // List of words to choose from for the user to guess
  countries: ["United States of America", "Japan", "Canada", "New Zealand", "Russia", "Sweden", "Zimbabwe", "Italy", "South Africa",
              "Pakistan", "China", "Saudi Arabia", "Singapore", "India", "Turkey", "Vietnam", "Israel", "Belgium", "Norway", "France",
              "Spain", "Greece", "Ireland", "Germany", "United Kingdom", "Switzerland", "Brazil", "Argentina", "Venezuela", "Mexico",
              "Trinidad and Tobago", "Australia"],

  alphabet:  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
              "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  
  usedLetters: [],  // Holds users guessed letters
  underscores: [],  // Will populate screen with underscores to match the number of letters in chosen random country
  chosenWord: "",   // Holds the randomly selected word from the randomWord function
  playerGuess: "",  // Holds the letter pressed by the player


  underscoreText: document.getElementById('underscores'),
  guessesText: document.getElementById('guesses'),
  wonText: document.getElementById('won'),
  lostText: document.getElementById('lost'),
  tryAgainText: document.getElementById('try-again'),
  flagImage: document.getElementById('flag'),

  // Reset button
  reset: document.getElementById('reset').onclick = function() {
    this.blur();  // Stops web page from focusing button so it can't be triggered with spacebar after being pressed
    hangman.usedLetters.length = 0;  // Reset the used letters array
    hangman.underscores.length=  0;  // Reset the chosen word
    hangman.guesses = 8;            // Reset guesses
    letters.parentNode.removeChild(letters); // Removes the letters display
    hangman.randomWord();            // Pick a new word
    hangman.createAlphabet();        // Resets the used letters display
    hangman.tryAgainText.className = "hidden";
    hangman.debug();
  },

  // Allows users to click alert to hide it instead of waiting for it to fade on next guess
  hideTryAgainText: document.getElementById('try-again').onclick = function() {
    hangman.tryAgainText.className = "hidden";
  },

   // Creates display of letters to inform the user what letters they have used
   createAlphabet: function () {
    myButtons = document.getElementById('letter-list');
    letters = document.createElement('ul');

    for (let i = 0; i < hangman.alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = hangman.alphabet[i];
      list.innerHTML = hangman.alphabet[i];
      // Add click event to each letter that guesses it's corresponding letter
      list.onclick = function() { hangman.checkGuess({key: hangman.alphabet[i]}) }
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  },

  // Updates text on screen with necessary variables and strings
  update: function() {
    hangman.underscoreText.textContent = hangman.underscores.join('');
    hangman.guessesText.textContent = "You have " + hangman.guesses + " guesses";
    // If word is completed
    if (hangman.underscores.indexOf('_') === -1) {
      hangman.guessesText.textContent = "You win!"
      hangman.wins++;
      hangman.wonText.textContent = "Won: " + hangman.wins;
      // Show flag
      hangman.flagImage.style.opacity = 1;
      // If out of guesses
    } else if (hangman.guesses === 0) {
      hangman.guessesText.textContent = "You lose, try again!"
      hangman.losses++;
      hangman.lostText.textContent = "Lost: " + hangman.losses;
    }
  },


  // Picks a random word in the countries array and displays it to console
  randomWord: function() {  
    let randomNumber = Math.floor(Math.random() * this.countries.length);
    this.chosenWord = this.countries[randomNumber];
    this.getFlag();
    this.chosenWord = this.chosenWord.toLowerCase();
      // Adds one underscore per letter in the randomly selected word from the countries array
      for (let i = 0; i < this.chosenWord.length; i++) {
        if (this.chosenWord[i] === ' ') {
          this.underscores.push('\xa0');
        } else {
        this.underscores.push('_');
        }
      }
      this.update();
  },

  // Get images for flags dynamically
  getFlag: function() {
    // Set the background-image of the flag element to the flag url
    function newImage() {
      hangman.flagImage.style.opacity = 0;
      hangman.flagImage.style.backgroundImage = 'url(' + flagUrl(hangman.chosenWord) +')'
    }
    // Function that returns url of flag
    function flagUrl (country) {
      country = country.split(' ').join('-')
      return "https://www.countries-ofthe-world.com/flags-normal/flag-of-"+(country)+".png"
    }
    newImage();
  },


  
  // Checks if playerGuess is a letter and not a sybmol 
   checkGuess: function(event) {
    this.playerGuess = event.key.toLowerCase(); // Converts playerGuess to lower case for continuity
    if (hangman.underscores.indexOf('_') === -1 || hangman.guesses === 0) { // Stop game if already won or lost
      return;
    } else if (!hangman.isLetter(this.playerGuess)) {
        console.log("Not a letter");
        return; // Stops here if playerGuess is not a letter
      } 
        // Check if letter is in the chosen word AND it's NOT in the usedLetters array
        if (hangman.chosenWord.indexOf(this.playerGuess) > -1 && hangman.usedLetters.indexOf(this.playerGuess) === -1) { 
          hangman.usedLetters.push(this.playerGuess);                 // Adds playerGuess to usedLetters array so it cannot be used again later
          let indeces = []; 
          for (let i = 0; i < hangman.chosenWord.length; i++) {       // Loop for number of letters in random word
            if (hangman.chosenWord.charAt(i) === this.playerGuess) {  // Check what index the playerGuess is found at in the random word
              indeces.push(i);                                        // Adds the index of the playerGuess found in the random word to indeces array
                for (const index of indeces) {                        // Loop that iterates over underscore array
                hangman.underscores[index] = this.playerGuess;        // Replace underscore array at every index playerGuess matches with chosenWord
                hangman.tryAgainText.className = "hidden";            // Hides the text that alerts the player the guess has already been used if it is
                hangman.onGuess();                                    // Function that finds letter pressed in the DOM and changes its class
                hangman.update();                                     // Function that pushes necessary variable changes to DOM 
                }
            }    
          } 
        // Check if letter is NOT in the chosenWord and NOT in the usedLetters array
        } else if (hangman.chosenWord.indexOf(this.playerGuess) === -1 && hangman.usedLetters.indexOf(this.playerGuess) === -1) {
            hangman.usedLetters.push(this.playerGuess); 
            hangman.guesses--;
            hangman.tryAgainText.className = "hidden"; 
            hangman.onGuess();
            hangman.update();
        // If playerGuess is already in the usedLetters array
        } else {
            hangman.tryAgainText.className = "visible"; // Shows a string that alerts the player the letter has been used already
            hangman.onGuess();
            hangman.update();
        }
      hangman.debug(); // Display info to console once per playerGuess
  },

  // Checks if letter is in the alphabet and not some other key
  isLetter: function(letter) {
    return letter.length === 1 && letter.match(/[a-z]/i);
  },

  // Changes class of letter display so it appears "used"
  onGuess: function() {
    for (const letter of hangman.usedLetters) {
      document.querySelector("#" + letter).className = "usedLetter";
    }
  },

  // Outputs necessary variables to console for debugging
  debug: function() {
    console.log("========= Start Debug =========")
    console.log("Wins: " + this.wins);
    console.log("Losses: " + this.losses);
    console.log("Guesses remaining " + this.guesses);
    console.log("Hidden word: " + this.chosenWord);
    console.log("Underscores: " + this.underscores);
    console.log("Letters tried: " + this.usedLetters);
    console.log("========== End Debug ==========")
  }
};

// Init game
hangman.createAlphabet();
hangman.randomWord();
hangman.debug();

// Listener
document.onkeyup = hangman.checkGuess;







