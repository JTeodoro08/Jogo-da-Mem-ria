const emojis = [
  "🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶", 
  "🐵", "🐵", "🦁", "🦁", "🐯", "🐯", "🐮", "🐮"
];

let openCards = [];
let score = 0;
let timeLeft = 60;
let timerInterval;
let gameStarted = false;

function startGame() {
  let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

  // Cria as cartas do jogo
  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
  }
}

// Função do cronômetro
function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
    document.getElementById("timer").innerText = `Tempo: ${timeLeft}s`;
  } else {
    clearInterval(timerInterval);
    alert("Fim do jogo! Você não conseguiu terminar a tempo.");
    resetGame();
  }
}

function handleClick() {
  // Iniciar cronômetro no primeiro clique
  if (!gameStarted) {
    timerInterval = setInterval(countdown, 1000);
    gameStarted = true;
  }

  // Revela a carta
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  // Verifica se há duas cartas abertas para conferir correspondência
  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
    score++;  // Incrementa pontos em caso de correspondência correta
    document.getElementById("score").innerText = `Pontos: ${score}`;
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  // Verifica se o jogador venceu o jogo
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(timerInterval);
    alert(`Você venceu com ${score} pontos!`);
    resetGame();
  }
}

function resetGame() {
  document.querySelector(".game").innerHTML = "";
  score = 0;
  timeLeft = 60;
  gameStarted = false;  // Reiniciar o estado do cronômetro
  document.getElementById("score").innerText = "Pontos: 0";
  document.getElementById("timer").innerText = "Tempo: 60s";
  startGame();
}

// Inicializar o jogo
startGame();
