/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        // Get the current game object
        const game = games[i];

        // Create a new div element for the game card
        const gameCard = document.createElement('div');

        // Add the class 'game-card' to the div
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name} image" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
        `;

        // Append the game card to the games-container
        const gamesContainer = document.getElementById('games-container');
        gamesContainer.appendChild(gameCard);
    }
}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Step 1: Calculate total number of individual contributions
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// Display the total contributions
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerHTML = totalContributions.toLocaleString(); // Format with commas

// Step 2: Calculate total amount of money pledged
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Display the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`; // Format with commas and dollar sign

// Grab the number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Set the number of games using the length of the GAMES_JSON array
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log(unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log(fundedGames.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const totalGames = GAMES_JSON.length;

const unfundedMessage = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''} remain unfunded. We need your help to fund thse amazing projects!`;


// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("p");
paragraph.innerHTML = unfundedMessage;

descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("p");
topGameElement.textContent = topGame.name;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

// do the same for the runner up item

// Search bar to allow users to find games by name
// Navigation Bar

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().include(searchTerm)
    );
    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
});
