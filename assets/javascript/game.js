/* Below is where our JavaScript code will go */
//Don't execute script until page is loaded
$(document).ready(function() {

    //Game States that effect the game variables
    var states = {
    INIT : "init",
    START : "start",
    WIN : "win",
    LOSS : "loss", //user ran out of remainingGuesses
    };

    //Static variables
    var instructionValue = "You will be given a random number at the start of the game. There are four crystals below.  By clicking on a crystal you will add a specific amount of points to your total score. You win the game by matching your total score to the random number.  You loose a game if your total score goes above the random number.  The value of each crystal is hidden from you until you click on it.  Each time the game starts, the game will change the values of each crystal.";
    
    //Game Messages
    var winMessage = "You won!";
    var lossMessage = "You loss.";
    
     //Variables to Update on Game Reset
    var rubyValue = 0;
    var citrineValue = 0;
    var diamondValue = 0;
    var emeraldValue = 0;
    var playerTotalValue = 0;
    var matchNumberValue = 0;
    
    //Counters
    var winCtr = 0;
    var lossCtr = 0;
    var state = states.INIT;
    var message = "Game Initailized";
    
    
    //Set game state
    function setState(newState){
      state = newState;
    }

    //Generates output displayed once and never changed
    function displayStaticOutput(){
        //create p element
        var $instructionRef = $("#instructionOutput");
        $instructionRef.text(instructionValue);
        //$("#instructionOutput").append($newInstructionElement);
    }

    //Helper method to update all dynamic output content
    function displayDynamicOutput(outputElement, value){
        //outputElement.textContent = value;
        var $outputElement = $("#"+outputElement);
        console.log($outputElement);
        $outputElement.text(value);
    }

    //Generate random number between 19 and 120
    function matchRandomNumber(){
        return Math.floor((Math.random() * 120) + 20);
    }

    //Generate random number between 1 and 12;
    function gemRandomNumber(){
        return Math.floor((Math.random() * 12) + 2);
    }

    //Set number Values
    function setRandomValues(){
        rubyValue = gemRandomNumber();
        citrineValue = gemRandomNumber();
        diamondValue = gemRandomNumber();
        emeraldValue = gemRandomNumber();
        //Reset playerTotalValue on New Games
        playerTotalValue = 0;
        matchNumberValue = matchRandomNumber();
    }

    //Helper function to keep track of win loss counters
    function increaseCtr(counter){
        var newCounter = counter + 1;
        console.log("Increase Value = "+newCounter);
        return newCounter;
    }

    //Helper functions to determine if a new state is required
    function hasPlayerWon(){
        if(playerTotalValue === matchNumberValue) return true;
        else return false;
    }

    function hasPlayerLoss(){
        if(playerTotalValue > matchNumberValue) return true;
        else return false;
    }

    function isGameReadyForNewState(){
        if(hasPlayerWon()){
            setState(states.WIN);
            console.log("STATE = "+state);
            //Set Counters
            updateGameScreen();
        }
        else if(hasPlayerLoss()){
            setState(states.LOSS);
            console.log("STATE = "+state);
            //Set Counters
            updateGameScreen();
        }
    }

    //Updates all display items
    function updateGameScreen(){
        
        switch(state) {
            case states.INIT:
                //1. Set/Reset all initials random values
                /*************************PROBLEM*********************************/
                //if(isGameReadyForNewState()){
                    setRandomValues();
                //}                

                //2. Display message
                displayDynamicOutput("statusMessageOutput", message);

                //3.Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //4.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //5.Display wins ctr
                displayDynamicOutput("winCtrOutput", winCtr);

                //6.Display wins ctr
                displayDynamicOutput("lossCtrOutput", lossCtr);

                //7.Set state to Start
                setState(states.START);

                break;
                case states.START:
                //1. No Random Variables Reset: Set/Reset all initials random values
                /*************************PROBLEM*********************************/
                //setRandomValues();                

                //2. Display message
                displayDynamicOutput("statusMessageOutput", message);

                //3.Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //4.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //5.Display wins ctr
                displayDynamicOutput("winCtrOutput", winCtr);

                //6.Display wins ctr
                displayDynamicOutput("lossCtrOutput", lossCtr);

                //No Need to Reset State
                break;
            case states.WIN:
                //1. Display message
                displayDynamicOutput("statusMessageOutput", winMessage);

                //2.Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //3.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //4.Increase and Display winCtr 
                winCtr = increaseCtr(winCtr);
                displayDynamicOutput("winCtrOutput", winCtr);

                //5.Display loss ctr
                displayDynamicOutput("lossCtrOutput", lossCtr);

                //reset State to START
                setState(states.INIT);

                //Update Screen
                updateGameScreen();
                break;
            default:
                //1. Display message
                displayDynamicOutput("statusMessageOutput", lossMessage);

                //2.Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //3.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //4.Display wins ctr
                displayDynamicOutput("winCtrOutput", winCtr);

                //5.Increase and Display loss ctr
                lossCtr = increaseCtr(lossCtr);
                displayDynamicOutput("lossCtrOutput", lossCtr);

                //reset State to START
                setState(states.INIT);

                //Update Screen
                updateGameScreen();
        }
        

        /*this.incrementWinCTR();
        this.displayOutput(winCtrRef, this.winCtr);*/

        //console.log("displayWinGameScreen: STATE = "+this.state);
    }

    //call static functions
    displayStaticOutput();


    //state set test
    //setState(states.WIN);
    updateGameScreen();

    // Here we created an on-click event that responds to button clicks of the crystal image.
    $(".ruby-image").on("click", function() {
        // Clicking the button triggers an alert message.
        console.log("Ruby Value = "+rubyValue);
        playerTotalValue = playerTotalValue+rubyValue;

        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();

        //Update dynamic variables based on game state
       // updateGameScreen();
    });

    $(".citrine-image").on("click", function() {
        // Clicking the button triggers an alert message.
        console.log("Citrine = "+citrineValue);
        playerTotalValue = playerTotalValue + citrineValue;

        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();

        //Update dynamic variables based on game state
        //updateGameScreen();
    });

    $(".diamond-image").on("click", function() {
        // Clicking the button triggers an alert message.
        console.log("Diamond = "+diamondValue);
        playerTotalValue = playerTotalValue + diamondValue;

        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();

        //Update dynamic variables based on game state
        //updateGameScreen();
    });
    $(".emerald-image").on("click", function() {
        // Clicking the button triggers an alert message.
        console.log("Emerald = "+emeraldValue);
        playerTotalValue = playerTotalValue + emeraldValue;
        
        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();
        
        //Update dynamic variables based on game state
        //updateGameScreen();
    });
});//JS