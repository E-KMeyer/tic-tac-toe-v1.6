// ---------- const que puxa as informaçoes do html
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
const playerX = document.querySelector('.placar-a');
const playerO = document.querySelector('.placar-b');
//-----------

//variável que determina a vez do jogador
let isCircleTurn;

//variável com a combinação de probabilidades de vitória
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


// função que determina o inicio do jogo

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {
            once: true
        });
    }

    //pesquisar ------------------------
    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

// determina o fim do jogo
const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ?
            "⭕ Venceu!" :
            "❌ Venceu!";

        if (isCircleTurn) {
            playerO.innerText = parseInt(playerO.innerText) + 1;
        } else {
            playerX.innerText = parseInt(playerX.innerText) + 1;
        }
    }
    winningMessage.classList.add("show-winning-message");
}
// chama a variável que checa a combinação de jogadas determinando o jogador (que sempre será o da vez)
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

//--------------------------------------------------------------------

//função que faz a checagem de empate
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};

const handleClick = (e) => {
    // Colocar a marca (X ou Círculo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd);

    // Verificar por empate
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // Mudar símbolo
        swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame);