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
    //var initMessage = "Game Set";
    
     //Variables to Update on Game Reset
    var rubyValue = 0;
    var citrineValue = 0;
    var diamondValue = 0;
    var emeraldValue = 0;
    var playerTotalValue = 0;
    var matchNumberValue = 0;
    
    //Counters
    var winCtr = 0;
    var winCtrTracker = 0;
    var lossCtr = 0;
    var lossCtrTracker =0;
    var state = states.INIT;
    
    
    //Set game state
    function setState(newState){
      state = newState;
    }

    function displayGems(){
        var gemImages = ["assets/images/ruby2.png", "assets/images/citrine2.png", "assets/images/diamond2.png", "assets/images/emerald2.png"];
        for(var i = 0; i < 4; i++)
        {
            var random = Math.floor(Math.random()*gemImages.length);
            $(".img"+i).attr("src", gemImages[random]);
            gemImages.splice(random, 1);
        }
    }
    //Generates output displayed once and never changed
    function displayStaticOutput(){
        //create p element
        var $instructionRef = $("#instructionOutput");
        $instructionRef.text(instructionValue);
    }

    //Helper method to update all dynamic output content
    function displayDynamicOutput(outputElement, value){
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
    function increaseValue(value){
        var newValue = value + 1;
        console.log("Increase Value = "+newValue);
        return newValue;
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

    function isTrackerLTCtr(tracker, ctr){
        var returnValue = false;
        if(tracker < ctr){
            returnValue = true;
        }
        return returnValue;
    }
    //Updates all display items
    function updateGameScreen(){
        
        switch(state) {
            case states.INIT:
                /******************************************
                ** 1. Set/Reset all initials random values
                *******************************************/
                    setRandomValues();

                //Shuffle the gems
                    displayGems();               
                /*******************************************/
                //2. Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //3.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //4.Display wins ctr
                displayDynamicOutput("winCtrOutput", winCtr);

                //5.Display wins ctr
                displayDynamicOutput("lossCtrOutput", lossCtr);

                //6.Set state to Start
                setState(states.START);

                break;
                case states.START:
                //1.Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //2.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //3.Display wins ctr
                displayDynamicOutput("winCtrOutput", winCtr);

                //4.Display wins ctr
                displayDynamicOutput("lossCtrOutput", lossCtr);

                break;
            case states.WIN:
                //1. Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //2.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //3.Increase and Display winCtr 
                winCtr = increaseValue(winCtr);
                displayDynamicOutput("winCtrOutput", winCtr);

                var isWin = isTrackerLTCtr(winCtrTracker, winCtr);
                console.log("I should display the WIN message now: "+isWin);
                
                if(isWin)
                {
                    winCtrTracker = increaseValue(winCtrTracker);
                    displayDynamicOutput("statusMessageOutput", winMessage);
                }

                //4. reset State to START
                setState(states.INIT);

                //5. Update Screen
                updateGameScreen();
                break;
            default:
                //1. Display Number to Match (random Number)
                displayDynamicOutput("matchNumberOutput", matchNumberValue);

                //2.Display Player Total Value (sum of clicks)
                displayDynamicOutput("playerTotalOutput", playerTotalValue);

                //3.Increase and Display loss ctr
                lossCtr = increaseValue(lossCtr);
                displayDynamicOutput("lossCtrOutput", lossCtr);

                var isLoss = isTrackerLTCtr(lossCtrTracker, lossCtr);
                console.log("I should display the LOSS message now: "+isLoss);
                if(isLoss)
                {
                    lossCtrTracker = increaseValue(lossCtrTracker);
                    displayDynamicOutput("statusMessageOutput", lossMessage);
                }

                //4. Reset State to START
                setState(states.INIT);

                //5. Update Screen
                updateGameScreen();
        }
        //console.log("displayWinGameScreen: STATE = "+this.state);
    }

    // Here we created an on-click event that responds to button clicks of the crystal image.
    $(".ruby-image").on("click", function() {
        //console.log("Ruby Value = "+rubyValue);
        playerTotalValue = playerTotalValue+rubyValue;

        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();
    });

    $(".citrine-image").on("click", function() {
        //console.log("Citrine = "+citrineValue);
        playerTotalValue = playerTotalValue + citrineValue;

        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();
    });

    $(".diamond-image").on("click", function() {
        //console.log("Diamond = "+diamondValue);
        playerTotalValue = playerTotalValue + diamondValue;

        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();
    });
    $(".emerald-image").on("click", function() {
        console.log("Emerald = "+emeraldValue);
        playerTotalValue = playerTotalValue + emeraldValue;
        
        //Display Player Total Value (sum of clicks)
        displayDynamicOutput("playerTotalOutput", playerTotalValue);

        //Check game before updating display
        isGameReadyForNewState();
    });

      //call static functions
      displayStaticOutput();

      //Update display
      updateGameScreen();     
});//JS