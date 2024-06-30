
const modal = document.getElementById("gameOverModal");
const guessInput = document.getElementById("guessInput");
const scoreBoard = document.getElementById("score");
const movieImage = document.getElementById("movieImage");
const modalContent = document.querySelector(".modal-content");

const movies = [
    { name: "Interstellar", image: "mg1.jpg" },
    { name: "Avatar", image: "mg2.jpg" },
    { name: "Spirited Away", image: "mg3.jpg" },
    { name: "The Matrix", image: "mg4.jpg" },
    { name: "Joker", image: "mg5.jpg" },
    { name: "The Godfather", image: "mg6.jpg" },
    { name: "Hacksaw Ridge", image: "mg7.jpg",},
    { name: "The Intouchables", image: "mg8.jpg" },
    { name: "Blade Runner", image: "mg9.jpg" },
    { name: "The Truman Show", image: "mg10.jpg" },
    { name: "Bad Genius", image: "mg11.jpeg" },
    { name: "Oppenheimer", image: "mg12.jpg" },
    { name: "Toy Story", image: "mg13.jpg" },
    { name: "The Creator", image: "mg14.jpg" },
    { name: "Guardians Of The Galaxy", image: "mg15.jpg" },
    { name: "Black Adam", image: "mg16.jpg" },
    { name: "Dune", image: "mg17.jpg" },
    { name: "Inception", image: "mg18.jpg" },
    { name: "The Shawshank Redemption", image: "mg19.jpg" },
    { name: "All Quiet On The Western Front", image: "mg20.jpg" },
    { name: "Who Am I", image: "mg21.jpg" },
    { name: "Whiplash", image: "mg22.jpg",},
    { name: "Evil Dead Rise", image: "mg23.jpg",},
    { name: "Suzume", image: "mg24.jpeg",},
    { name: "Divergent", image: "mg25.jpg",},
    { name: "Bullet Train", image: "mg26.jpg",},
    { name: "Uncharted", image: "mg27.jpg",},
    { name: "Top Gun Maverick", image: "mg28.jpg",},
    { name: "The Beekeeper", image: "mg29.jpg",},
    { name: "American Psycho", image: "mg30.jpg",},
];

let score;
let currentMovieIndex;
let warningShown = false;

function preloadImages() {
    movies.forEach((movie) => {
        const img = new Image();
        img.src = movie.image;
    });
}
function startGame() {
    score = 0;
    updateScore();
    currentMovieIndex = 0;
    shuffleMovies();
    getNextMovie();
    populateGuessSelect();
}

function shuffleMovies() {
    for (let i = movies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [movies[i], movies[j]] = [movies[j], movies[i]];
    }
}

function getNextMovie() {
    const currentMovie = movies[currentMovieIndex];
    movieImage.src = currentMovie.image;
}


//! Function to get a random movie
function getNextMovie() {
    const currentMovie = movies[currentMovieIndex];
    movieImage.src = currentMovie.image;
}

//! Function to check the user's guess
function checkGuess() {
    const userGuess = guessInput.value.trim().toLowerCase();
    const currentMovie = movies[currentMovieIndex];

    if (userGuess === currentMovie.name.toLowerCase()) {
        movieImage.style.boxShadow = "-1px 1px 25px 14px #52ffa880";
        movieImage.style.outline = "3px solid #52ffa9";

        setTimeout(() => {
            score++;
            updateScore();
            currentMovieIndex++;
            guessInput.value = "";
            resetStyles();
            scoreBoard.classList.add("animation");

            if (score < movies.length) {
                getNextMovie();
            } else {
                showWinGameModal();
            }
        }, 800);
    } else if (userGuess === "") {
        if (!warningShown) {
            showWarningMessage();
            warningShown = true;
        }
    } else {
        movieImage.style.boxShadow = "-1px 1px 25px 16px #a20927";
        movieImage.style.outline = "3px solid #a20927";
        scoreBoard.classList.remove("animation");

        if (!warningShown) {
            currentMovieIndex++;
        }
        showGameOverModal();
    }
}

//! Function to update the score display
function updateScore() {
    scoreBoard.textContent = `Score: ${score}`;
}

//! Function to show the warning message
function showWarningMessage() {
    modalContent.innerHTML = `
    <p class="message">Masukan judul film di kolom yang tersedia terlebih dahulu!</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;

    modal.style.display = "flex";
    document.addEventListener("keyup", closeModalOnEnter);
}

//! Function to show the game over modal
function showGameOverModal() {
    modalContent.innerHTML = `
    <p class="message">Game Over! </p>
    <P class="message">Tebakan Anda Salah</p>
    <p>Total Skor anda: ${score}</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;

    modal.style.display = "flex";
    document.addEventListener("keyup", closeModalOnEnter);
}

//! Function to show the modal when the user win the game
function showWinGameModal() {
    modalContent.innerHTML = `
    <p class="message">You won the game!</p>
    <p>Total Skor anda: ${score}</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;

    modal.style.display = "flex";
    scoreBoard.classList.remove("animation");
    document.addEventListener("keyup", closeModalOnEnter);
}

//! Function to close the modal on Enter key press
function closeModalOnEnter(e) {
    if (e.key === "Enter" && modal.style.display === "flex") {
        modal.style.display = "none";
        modalContent.innerHTML = "";
        guessInput.value = "";
        resetStyles();
        document.removeEventListener("keyup", closeModalOnEnter);

        if (!warningShown) {
            startGame();
        } else {
            warningShown = false;
        }
    }
}

//! Function to close the modal by clicking "OK" button
function closeModal() {
    modal.style.display = "none";
    modalContent.innerHTML = "";
    guessInput.value = "";
    resetStyles();
    document.removeEventListener("keyup", closeModalOnEnter);

    if (!warningShown) {
        startGame();
    } else {
        warningShown = false;
    }
}

//! Event listener for the Enter key to automatically check the guess
document.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && modal.style.display !== "flex") {
        checkGuess();
    }
});

//! Function to focus on input
function focusOnInput() {
    guessInput.focus();
}

//! Function to reset the styles
function resetStyles() {
    movieImage.style.boxShadow = "";
    movieImage.style.outline = "";
}

//! Get the cursor position in the input
guessInput.addEventListener("keyup", (e) => {
    console.log("Caret at: ", e.target.selectionStart);
});

//! Start the game when the page loads
window.onload = startGame;