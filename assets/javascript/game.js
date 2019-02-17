/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* Below is where our JavaScript code will go */
// Don't execute script until page is loaded
$(document).ready(() => {
  // Game States that effect the game variables
  const states = {
    INIT: 'init',
    START: 'start',
    WIN: 'win',
    LOSS: 'loss', // user ran out of remainingGuesses
  };

  // Static variables
  const instructionValue = 'You will be given a random number at the start of the game. There are four crystals below.  By clicking on a crystal you will add a specific amount of points to your total score. You win the game by matching your total score to the random number.  You loose a game if your total score goes above the random number.  The value of each crystal is hidden from you until you click on it.  Each time the game starts, the game will change the values of each crystal.';

  // Game Messages
  const winMessage = 'You won!';
  const lossMessage = 'You loss.';
  // var initMessage = "Game Set";

  // Variables to Update on Game Reset
  let rubyValue = 0;
  let citrineValue = 0;
  let diamondValue = 0;
  let emeraldValue = 0;
  let playerTotalValue = 0;
  let matchNumberValue = 0;

  // Counters
  let winCtr = 0;
  let winCtrTracker = 0;
  let lossCtr = 0;
  let lossCtrTracker = 0;
  let state = states.INIT;


  // Set game state
  function setState(newState) {
    state = newState;
  }

  function displayGems() {
    const gemImages = ['assets/images/ruby2.png', 'assets/images/citrine2.png', 'assets/images/diamond2.png', 'assets/images/emerald2.png'];
    for (let i = 0; i < 4; i += 1) {
      const random = Math.floor(Math.random() * gemImages.length);
      $(`.img${i}`).attr('src', gemImages[random]);
      gemImages.splice(random, 1);
    }
  }
  // Generates output displayed once and never changed
  function displayStaticOutput() {
    // create p element
    const $instructionRef = $('#instructionOutput');
    $instructionRef.text(instructionValue);
  }

  // Helper method to update all dynamic output content
  function displayDynamicOutput(outputElement, value) {
    const $outputElement = $(`#${outputElement}`);
    // ($outputElement);
    $outputElement.text(value);
  }

  // Generate random number between 19 and 120
  function matchRandomNumber() {
    return Math.floor((Math.random() * 120) + 20);
  }

  // Generate random number between 1 and 12;
  function gemRandomNumber() {
    return Math.floor((Math.random() * 12) + 2);
  }

  // Set number Values
  function setRandomValues() {
    rubyValue = gemRandomNumber();
    citrineValue = gemRandomNumber();
    diamondValue = gemRandomNumber();
    emeraldValue = gemRandomNumber();
    // Reset playerTotalValue on New Games
    playerTotalValue = 0;
    matchNumberValue = matchRandomNumber();
  }

  // Helper function to keep track of win loss counters
  function increaseValue(value) {
    const newValue = value + 1;
    return newValue;
  }

  // Helper functions to determine if a new state is required
  function hasPlayerWon() {
    if (playerTotalValue === matchNumberValue) return true;
    return false;
  }

  function hasPlayerLoss() {
    if (playerTotalValue > matchNumberValue) return true;
    return false;
  }

  function isGameReadyForNewState() {
    if (hasPlayerWon()) {
      setState(states.WIN);
      // Set Counters
      updateGameScreen();
    } else if (hasPlayerLoss()) {
      setState(states.LOSS);
      // Set Counters
      updateGameScreen();
    }
  }

  function isTrackerLTCtr(tracker, ctr) {
    let returnValue = false;
    if (tracker < ctr) {
      returnValue = true;
    }
    return returnValue;
  }
  // Updates all display items
  function updateGameScreen() {
    switch (state) {
      case states.INIT:
        /** ****************************************
                ** 1. Set/Reset all initials random values
                ****************************************** */
        setRandomValues();

        // Shuffle the gems
        displayGems();
        /** **************************************** */
        // 2. Display Number to Match (random Number)
        displayDynamicOutput('matchNumberOutput', matchNumberValue);

        // 3.Display Player Total Value (sum of clicks)
        displayDynamicOutput('playerTotalOutput', playerTotalValue);

        // 4.Display wins ctr
        displayDynamicOutput('winCtrOutput', winCtr);

        // 5.Display wins ctr
        displayDynamicOutput('lossCtrOutput', lossCtr);

        // 6.Set state to Start
        setState(states.START);

        break;
      case states.START:
        // 1.Display Number to Match (random Number)
        displayDynamicOutput('matchNumberOutput', matchNumberValue);

        // 2.Display Player Total Value (sum of clicks)
        displayDynamicOutput('playerTotalOutput', playerTotalValue);

        // 3.Display wins ctr
        displayDynamicOutput('winCtrOutput', winCtr);

        // 4.Display wins ctr
        displayDynamicOutput('lossCtrOutput', lossCtr);

        break;
      case states.WIN:
        // 1. Display Number to Match (random Number)
        displayDynamicOutput('matchNumberOutput', matchNumberValue);

        // 2.Display Player Total Value (sum of clicks)
        displayDynamicOutput('playerTotalOutput', playerTotalValue);

        // 3.Increase and Display winCtr
        winCtr = increaseValue(winCtr);
        displayDynamicOutput('winCtrOutput', winCtr);

        let isWin = isTrackerLTCtr(winCtrTracker, winCtr);

        if (isWin) {
          winCtrTracker = increaseValue(winCtrTracker);
          displayDynamicOutput('statusMessageOutput', winMessage);
        }

        // 4. reset State to START
        setState(states.INIT);

        // 5. Update Screen
        updateGameScreen();
        break;
      default:
        // 1. Display Number to Match (random Number)
        displayDynamicOutput('matchNumberOutput', matchNumberValue);

        // 2.Display Player Total Value (sum of clicks)
        displayDynamicOutput('playerTotalOutput', playerTotalValue);

        // 3.Increase and Display loss ctr
        lossCtr = increaseValue(lossCtr);
        displayDynamicOutput('lossCtrOutput', lossCtr);

        let isLoss = isTrackerLTCtr(lossCtrTracker, lossCtr);
        if (isLoss) {
          lossCtrTracker = increaseValue(lossCtrTracker);
          displayDynamicOutput('statusMessageOutput', lossMessage);
        }

        // 4. Reset State to START
        setState(states.INIT);

        // 5. Update Screen
        updateGameScreen();
    }
  }

  // Here we created an on-click event that responds to button clicks of the crystal image.
  $('.ruby-image').on('click', () => {
    playerTotalValue += rubyValue;

    // Display Player Total Value (sum of clicks)
    displayDynamicOutput('playerTotalOutput', playerTotalValue);

    // Check game before updating display
    isGameReadyForNewState();
  });

  $('.citrine-image').on('click', () => {
    playerTotalValue += citrineValue;

    // Display Player Total Value (sum of clicks)
    displayDynamicOutput('playerTotalOutput', playerTotalValue);

    // Check game before updating display
    isGameReadyForNewState();
  });

  $('.diamond-image').on('click', () => {
    playerTotalValue += diamondValue;

    // Display Player Total Value (sum of clicks)
    displayDynamicOutput('playerTotalOutput', playerTotalValue);

    // Check game before updating display
    isGameReadyForNewState();
  });
  $('.emerald-image').on('click', () => {
    // (`Emerald = ${emeraldValue}`);
    playerTotalValue += emeraldValue;

    // Display Player Total Value (sum of clicks)
    displayDynamicOutput('playerTotalOutput', playerTotalValue);

    // Check game before updating display
    isGameReadyForNewState();
  });

  // call static functions
  displayStaticOutput();

  // Update display
  updateGameScreen();
});// JS
