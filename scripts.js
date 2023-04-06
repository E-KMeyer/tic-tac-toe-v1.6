// ---------- const que puxa as informaçoes do html
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
const scoreboard = document.querySelector("[data-score]");
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
    cell.addEventListener("click", handleClick, { once: true });
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
    winningMessageTextElement.innerText = isCircleTurn
      ? "⭕ Venceu!"
      : "❌ Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

//-------------------------------------------------------------------
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

const countScore = (winningPlayer) => {
  if (winningPlayer === "circle") {
    scoreboard.innerText = parseInt(scoreboard.innerText) + 1;
  } else {
    scoreboard.innerText = parseInt(scoreboard.innerText) - 1;
  }
};


// 1. const cellElements = document.querySelectorAll("[data-cell]");
// Esta linha define uma constante chamada cellElements que é uma matriz de elementos selecionados usando a função querySelectorAll() do documento. Essa função recupera todos os elementos dentro do documento que correspondem ao seletor especificado.

// 2. const board = document.querySelector("[data-board]");
// Esta linha define uma constante chamada board que é um elemento selecionado usando a função querySelector() do documento. Essa função recupera o primeiro elemento dentro do documento que corresponde ao seletor especificado.

// 3. const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
// Esta linha define uma constante chamada winningMessageTextElement que é um elemento selecionado usando a função querySelector() do documento. Essa função recupera o primeiro elemento dentro do documento que corresponde ao seletor especificado.

// 4. const winningMessage = document.querySelector("[data-winning-message]");
// Esta linha define uma constante chamada winningMessage que é um elemento selecionado usando a função querySelector() do documento. Essa função recupera o primeiro elemento dentro do documento que corresponde ao seletor especificado.

// 5. const restartButton = document.querySelector("[data-restart-button]");
// Esta linha define uma constante chamada restartButton que é um elemento selecionado usando a função querySelector() do documento. Essa função recupera o primeiro elemento dentro do documento que corresponde ao seletor especificado.

// 6. let isCircleTurn;
// Esta linha define uma variável chamada isCircleTurn que é usada para rastrear a vez de quem está jogando.

// 7. const winningCombinations = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
// Esta linha define uma constante chamada winningCombinations que é uma matriz de matrizes contendo os índices de cada combinação vencedora.

// 8. const startGame = () => {
// Esta linha define uma função chamada startGame que inicializa o jogo.

// 9. const endGame = (isDraw) => {
// Esta linha define uma função chamada endGame que é chamada quando o jogo termina.

// 10. const checkForWin = (currentPlayer) => {
// Esta linha define uma função chamada checkForWin que verifica se o jogador atual tem uma combinação vencedora.

// 11. const checkForDraw = () => {
// Esta linha define uma função chamada checkForDraw que verifica se o jogo foi um empate.

// 12. const placeMark = (cell, classToAdd) => {
// Esta linha define uma função chamada placeMark que coloca uma marca (x ou círculo) na célula especificada.

// 13. const setBoardHoverClass = () => {
// Esta linha define uma função chamada setBoardHoverClass que adiciona uma classe ao tabuleiro para indicar qual símbolo está em jogo.

// 14. const swapTurns = () => {
// Esta linha define uma função chamada swapTurns que alterna o símbolo que está em jogo.

// 15. const handleClick = (e) => {
// Esta linha define uma função chamada handleClick que é chamada quando um usuário clica em uma célula.

// 16. startGame();
// Esta linha chama a função startGame para iniciar o jogo.

// 17. restartButton.addEventListener("click", startGame);
// Esta linha adiciona um ouvinte de clique ao botão de reinício que chama a função startGame quando o botão é clicado.