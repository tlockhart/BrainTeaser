# Crystal Collector
This repo is an interactive brain teaser.  The goal of the game is to match the players total score to a random number.  The player adds points by clicking a crystal.  However, since the value of the crystals are not displayed, the player must guess the crystal's value.  The game displays the following:
1. Random Number
1. Total Score
1. Status Message
1. Number of Wins
1. Number of Losses
# Demo
*https://tlockhart.github.io/BrainTeaser/
## Setup
In order to run the app, you will need to run the index.html file on a computer with a web browser and internet access.  After cloning the repository, you can edit the files in your IDE of choice.  The main files are:
1. index.html
1. assets/javascript/game.js
1. assets/css/style.css
## Game Play
After the app is started the display will show a random number.  The player begins game play, by clicking one of the four crystals. The player adds points to their total by clicking on a crystal.  Each crystal has a specific value per game.  The value of each crystal is hidden from the player until they click on it and their total score is increased.  Each time the game is reset, the crystals are shuffled, indicating they have received a new value. The player wins the game by matching their total score to the random number. They loose a game if their total score goes above the random number. Each time a player wins a game, their number of wins increases and a status message displays.  Each time a player looses, their number of losses increases and a status message displays.  The game will loop infinitely.  The player can close the app when they are done.
## Technologies Used
1. Bootstrap
1. JQuery
1. JavaScript
1. CSS3
1. HTML5
## Use
This repo is available for public non-commercial use only.
## Goal
The goal of this project was to create an interactive brain teaser that is dynamically updated by JQuery.
