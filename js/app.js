

// function to display random joke from JokeAPI
async function fetchRandomJokes() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart'); // Fetching a two-part joke
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error Fetching Joke:', error);
        return null;
    }
}

// Function to display the joke on the screen
function displayJoke(joke) {
    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.innerHTML = ''; // Clear previous joke

    const jokeDiv = document.createElement('div');
    jokeDiv.classList.add('joke-container');

    const setupText = document.createElement('p');
    setupText.textContent = joke.setup;

    const punchlineText = document.createElement('p');
    punchlineText.textContent = joke.delivery;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Add to Favorites!';
    saveButton.addEventListener('click', () => saveJoke(joke));

    jokeDiv.appendChild(setupText);
    jokeDiv.appendChild(punchlineText);
    jokeDiv.appendChild(saveButton);
    jokeContainer.appendChild(jokeDiv);

}

// function to handle click on "New Joke" button
document.getElementById('new-joke-btn').addEventListener('click', async () => {
    const randomJoke = await fetchRandomJokes();
    if (randomJoke) {
        displayJoke(randomJoke);
    } else {
        const jokeContainer = document.getElementById('joke-container');
        jokeContainer.innerHTML = '<p>Failed to fetch joke. Please try again later.</p>';
    }
})

// Function to save a joke to localStorage
function saveJoke(joke) {
    const savedJokes = JSON.parse(localStorage.getItem('savedJokes')) || [];
    savedJokes.push(joke);
    localStorage.setItem('savedJokes', JSON.stringify(savedJokes));
}

window.onload = async () => {
    const randomJoke = await fetchRandomJokes();
    if (randomJoke) {
        displayJoke(randomJoke);
    } else {
        const jokeContainer = document.getElementById('joke-container');
        jokeContainer.innerHTML = '<p>Failed to fetch joke. Please try again later.</p>';
    }
}