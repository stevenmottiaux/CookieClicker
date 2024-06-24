let totalScore = 0;
let totalScoreHtml = document.getElementById("score");

let totalMultiplicateur = 1;
let totalMultiplicateurHtml = document.getElementById("multiplicateur");


let cookieClick = document.getElementById("cookie");
let bonusDisplay = document.getElementById("bonus");

let bonusTimer = 30;
let bonusTimerHtml = document.getElementById("timer");

let bonusState = "désactivé";
let bonusStateHtml = document.getElementById("bonus-3-state");
bonusStateHtml.innerHTML = bonusState;

let mutliplicatorBonus = document.getElementById("bonus1");
let autoClickBonus = document.getElementById("bonus2");
let bonus200Pourcents = document.getElementById("bonus3");

let bonus1Cost = 200;
let bonus2Cost = 500;
let bonus3Cost = 50;

let bonus1Number = 0;
let bonus2Number = 0;
let bonus3Number = 0;

let autoClickNumber = 0;
let is200PercentBonusActive = false;

// add score on cookie click

function clickScore() {
  let scoreValue;
  if (is200PercentBonusActive === false) {
    scoreValue = 1 * totalMultiplicateur;
  } else {
    scoreValue = 2 * totalMultiplicateur;
  }
  totalScore += scoreValue;
  udpateScoreDisplay();
  blockBonusPurchase();
  displayClickValue(scoreValue);
}

function displayClickValue(value) {
  const cookieDisplay = document.getElementById("cookie-display");
  const clickValueDisplay = document.createElement("div");
  clickValueDisplay.textContent = `+${value}`;
  clickValueDisplay.style.position = "absolute";
  const containerWidth = cookieDisplay.offsetWidth;
  const containerHeight = cookieDisplay.offsetHeight;

  // Position aléatoire en largeur et hauteur, en tenant compte des dimensions du conteneur
  clickValueDisplay.style.left = `${Math.random() * (containerWidth - 20)}px`; // 20px moins pour éviter tout débordement
  clickValueDisplay.style.top = `${Math.random() * (containerHeight - 20)}px`; // 20px moins pour éviter tout débordement

  clickValueDisplay.style.color = "white"; // Couleur du texte
  clickValueDisplay.style.fontSize = "20px"; // Taille du texte
  cookieDisplay.appendChild(clickValueDisplay);
  setTimeout(() => clickValueDisplay.remove(), 1000); // Supprimer l'élément après 1 seconde
}

function udpateScoreDisplay() {
  totalScoreHtml.innerText = `${totalScore}`;
}

function addMultiplicator() {
  totalMultiplicateur += 1;
  totalScore -= bonus1Cost;
  bonus1Cost *= 1.5 ;
  udpateScoreDisplay();
  udpateMultiplicatorDisplay();
  blockBonusPurchase();
  updateCostDisplay();
}

function blockBonusPurchase() {
  mutliplicatorBonus.disabled = totalScore < bonus1Cost;
  autoClickBonus.disabled = totalScore < bonus2Cost;
  bonus200Pourcents.disabled = is200PercentBonusActive || totalScore < bonus3Cost;
}

blockBonusPurchase();

function udpateMultiplicatorDisplay() {
  totalMultiplicateurHtml.innerText = `x${totalMultiplicateur}`;
}

//auto clicker function

function addAutoClicker() {
  autoClickNumber += 1;
  totalScore -= bonus2Cost;
  bonus2Cost *= 2;
  udpateScoreDisplay();
  blockBonusPurchase();
  updateCostDisplay();
  if (autoClickNumber === 1) {
    startAutoClicker(cookieClick, 1000);
  }
}

function simulateClick(element) {
  var event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

function startAutoClicker(element, interval) {
  if (autoClickNumber === 0) {
    var clickInterval = setInterval(function () {
      simulateClick(element);
    }, interval);

    // Arrêter l'intervalle lorsque autoClickNumber est réduit à 0
    autoClickBonus.addEventListener("click", function () {
      if (autoClickNumber === 0) {
        clearInterval(clickInterval);
      }
    });
  }
}

// Bonus 200%

function activate200PercentBonus() {
  if (totalScore >= bonus3Cost && !is200PercentBonusActive) {
    is200PercentBonusActive = true;
    totalScore -= bonus3Cost;
    bonus3Cost *= 1.5;
    udpateScoreDisplay();
    updateCostDisplay();
    blockBonusPurchase();
    reduceTimer();
    udpateTimer();
    bonusTimerHtml.innerText = bonusTimer;
    bonusStateHtml.innerHTML = "activé";
    // Désactiver le bonus après 30 secondes
    setTimeout(function () {
      is200PercentBonusActive = false;
    }, 30000);
  }
};

// Réduire le timer chaque seconde

function reduceTimer() {
  let timerInterval = setInterval(function () {
    bonusTimer -= 1;
    udpateTimer();
    if (bonusTimer === 0) {
      clearInterval(timerInterval); // Arrêter l'intervalle lorsque le temps est écoulé
      bonusTimerHtml.innerText = "30"; // Effacer le texte du timer
      bonusStateHtml.innerHTML = "désactivé";
    }
  }, 1000); // intervalle d'une seconde (1000 ms)
}

function udpateTimer() {
  bonusTimerHtml.innerHTML = bonusTimer;
}

function updateCostDisplay() {
  document.getElementById("bonus1CostDisplay").textContent = bonus1Cost;
  document.getElementById("bonus2CostDisplay").textContent = bonus2Cost;
  document.getElementById("bonus3CostDisplay").textContent = bonus3Cost;
}



cookieClick.addEventListener("click", clickScore);
mutliplicatorBonus.addEventListener("click", addMultiplicator);
autoClickBonus.addEventListener("click", function () {
  addAutoClicker();
});
bonus200Pourcents.addEventListener("click", function () {
  activate200PercentBonus();
});

updateCostDisplay();
udpateTimer();

