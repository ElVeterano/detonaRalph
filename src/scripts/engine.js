const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),   /* view serão as variaveis que alteram algo diretamente visual com o nosso utilizador, entao sao os quadrados, o score, o inimigo e o tempo */  
        lifes: document.querySelector("#lifes"),
    },
    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lifesNow: 3,
    },
};

function lifesDown() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => { 
            if(square.id != state.values.hitPosition && state.values.lifesNow >= 1) {
                state.values.lifesNow--;
                state.view.lifes.textContent = (`x${state.values.lifesNow}`);
            } else if (state.values.lifesNow < 1) {
                alert("GAME OVER! VOCÊ FICOU SEM VIDAS!");
                state.values.currentTime = 1;
            }
        });
    });
}

function playSound(audioName) {
    let audio = new Audio(`src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        state.values.hitPosition = null;
    }
}

function moveEnemy() {
    state.values.timerId = setInterval(ramdomSquare, state.values.gameVelocity);
}

function ramdomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let ramdomNumber = Math.floor(Math.random() * 9);
    let ramdomSquare = state.view.squares[ramdomNumber];
    ramdomSquare.classList.add("enemy");
    state.values.hitPosition = ramdomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function initialize() {
    moveEnemy();
    lifesDown();
    addListenerHitBox();
}

initialize();