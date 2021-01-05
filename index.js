// Import stylesheets
import "./style.css";
// Pobranie referencji

const mainTitle = document.querySelector("#main-title");

const topCatImg = document.querySelector("#kot-1-img");
const topCatTitle = document.querySelector("#kot-1-nr");
const topCatBtn = document.querySelector("#kot-1-btn");

const bottomCatImg = document.querySelector("#kot-2-img");
const bottomCatTitle = document.querySelector("#kot-2-nr");
const bottomCatBtn = document.querySelector("#kot-2-btn");

const catDisplayCards = document.querySelectorAll(".display-container");

//Funkcje do obsługi widoku

function removeVotingBtns() {
  document.querySelectorAll("a").forEach(btn => {
    btn.classList.add("shrink");
  });
}

function declareWinner(event) {
  event.stopPropagation();

  event.target.parentElement.dispatchEvent(new CustomEvent("win"));
  removeVotingBtns();

  return;
}

function addChangeCatHandler(targetElement, imageToAffect, titleToAffect) {
  targetElement.addEventListener("click", event => {
    if (isListEmpty(catsToDisplay)) return declareWinner(event);

    const newCatNumber = getRandomElement(catsToDisplay);
    removeDisplayedCat(catsToDisplay, newCatNumber);
    renderCatNumber(newCatNumber, titleToAffect);

    const newImgSrc = `https://cataas.com/cat?${newCatNumber}`;
    imageToAffect.src = newImgSrc;
  });
}

function renderCatNumber(imgNumber, title) {
  if (!imgNumber) return;
  title.innerText = `Kot #${imgNumber}`;
}

function renderInitialCats() {
  topCatBtn.dispatchEvent(new MouseEvent("click"));
  bottomCatBtn.dispatchEvent(new MouseEvent("click"));
}

function startEndingAnimation(event) {
  const winningCard = event.target;

  markTheWinner(winningCard);

  const losingCards = document.querySelectorAll(
    `.display-container:not(#${event.target.getAttribute("id")})`
  );
  losingCards.forEach(card => {
    fadeOutAndRemove(card);
  });
}

function markTheWinner(winner) {
  winner.style.backgroundImage =
    "url('https://png.pngtree.com/thumb_back/fh260/background/20200122/pngtree-creative-valentine-s-day-pattern-background-image_327607.jpg')";

  winner.querySelector("h2").style.color = "black";
  winner.querySelector("h2").style.fontWeight = "900";
}

function fadeOutAndRemove(element) {
  element.addEventListener(
    "animationend",
    () => {
      element.parentElement.removeChild(element);
      renderWinnerTitle(mainTitle);
    },
    { once: true }
  );

  element.classList.add("fadeOut");
}

function renderWinnerTitle(mainTitle) {
  mainTitle.innerText = "Najsłodszy kotek wybrany!!! <3";
}

//Funkcje do obsługi stanu

function createCatsArray(numberOfCats) {
  const cats = [];

  for (let i = 1; i <= numberOfCats; i++) {
    cats.push(i);
  }
  return cats;
}

function removeDisplayedCat(catsArray, catNumber) {
  catsArray.splice(catsArray.indexOf(catNumber), 1);
}

function getRandomIntiger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  const randomIndex = getRandomIntiger(0, array.length - 1);
  return array[randomIndex];
}

function isListEmpty(displayList) {
  return displayList.length === 0;
}

//Wyższy poziom abstrakcji

const catsToDisplay = createCatsArray(20);

addChangeCatHandler(topCatBtn, bottomCatImg, bottomCatTitle);
addChangeCatHandler(bottomCatBtn, topCatImg, topCatTitle);

renderInitialCats();

catDisplayCards.forEach(card => {
  card.addEventListener("win", startEndingAnimation, { once: true });
});
