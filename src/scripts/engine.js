const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        reset: document.querySelector("#reset-game"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        liveCount: 5,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        playSound("gameOver");
        alert("Fim de jogo! Sua pontuação foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.wav`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function addListenerBadBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.classList.contains("enemy") === false) {
                state.values.liveCount--;
                state.view.lives.textContent = state.values.liveCount;
                if (state.values.liveCount === 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    playSound("gameOver");
                    alert("Game Over!");
                    resetGame();
                }
            }
        });
    });
}

const reset = state.view.reset
reset.addEventListener("click", resetGame); 

function resetGame() {
    document.location.reload(true);
}

function initialize() {
    addListenerHitBox();
    addListenerBadBox();
    playSound("reset");
}

initialize();