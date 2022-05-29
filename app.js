const inputsCouleur = document.querySelectorAll(".inp__couleur");
const inputRange = document.querySelector(".inp__range");
const containerCouleur = document.querySelector(".container__couleur");
const btns = document.querySelectorAll("button");
const font = document.querySelector("body");
const span = document.querySelector("span");
let index = 3;

// Initialisation

let valCouleur = ["#BA5370", "#F4E2D8"];
let inclinaison = 45;

inputsCouleur[0].value = valCouleur[0];
inputsCouleur[1].value = valCouleur[1];

inputsCouleur[0].style.background = valCouleur[0];
inputsCouleur[1].style.background = valCouleur[1];
font.style.background = `linear-gradient(${inclinaison}deg, ${valCouleur})`;

//Inclinaison

inputRange.addEventListener("input", (e) => {
  inclinaison = e.target.value * 3.6;
  font.style.background = `linear-gradient(${inclinaison}deg, ${valCouleur})`;
});

//Rajout de couleur

btns.forEach((btn) => {
  btn.addEventListener("click", rajouteEnleve);
});

function rajouteEnleve(e) {
  const allInputs = document.querySelectorAll(".inp__couleur");
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  if (e.target.className === "plus") {
    if (allInputs.length > 8) {
      return;
    }

    const nvCouleur = document.createElement("input");
    nvCouleur.setAttribute("class", "inp__couleur");
    nvCouleur.setAttribute("data-index", index);
    nvCouleur.setAttribute("maxlength", 7);
    nvCouleur.value = `#${randomColor.toUpperCase()}`;
    nvCouleur.style.background = `#${randomColor}`;
    containerCouleur.appendChild(nvCouleur);
    span.innerText = "";
    index++;
    valCouleur.push(`#${randomColor}`);
    font.style.background = `linear-gradient(${inclinaison}deg, ${valCouleur})`;
  } else if (e.target.className === "moins") {
    if (valCouleur.length === 2) {
      span.innerText = "Il faut au moins deux couleurs";
    } else {
      valCouleur.pop();
      allInputs[allInputs.length - 1].remove();
      font.style.background = `linear-gradient(${inclinaison}deg, ${valCouleur})`;
      index--;
    }
  }

  //Mise à jour des couleurs Nv inputs

  allInputs.forEach((input) => {
    input.addEventListener("input", majColor);
  });

  function majColor(e) {
    let indexEnCours = e.target.getAttribute("data-index");
    e.target.value = e.target.value.toUpperCase();
    valCouleur[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleur[indexEnCours - 1];
    font.style.background = `linear-gradient(${inclinaison}deg, ${valCouleur})`;
  }
}

inputsCouleur.forEach((input) => {
  input.addEventListener("input", majColor);
});

function majColor(e) {
  let indexEnCours = e.target.getAttribute("data-index");
  e.target.value = e.target.value.toUpperCase();
  valCouleur[indexEnCours - 1] = e.target.value.toUpperCase();
  e.target.style.background = valCouleur[indexEnCours - 1];
  font.style.background = `linear-gradient(${inclinaison}deg, ${valCouleur})`;
}

// Couleur aléatoire

btns[2].addEventListener("click", () => {
  const inputs = document.querySelectorAll(".inp__couleur");
  for (let i = 0; i < valCouleur.length; i++) {
    valCouleur[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    inputs[i].value = valCouleur[i].toUpperCase();
    inputs[i].style.background = valCouleur[i];
    font.style.background = `linear-gradient(${inclinaison}deg, ${valCouleur})`;
  }
});
