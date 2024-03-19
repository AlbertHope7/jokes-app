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

    jokeDiv.appendChild(setupText);
    jokeDiv.appendChild(punchlineText);
    jokeContainer.appendChild(jokeDiv);

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