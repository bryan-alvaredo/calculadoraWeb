const app = document.getElementById("app");
const container = document.createElement("section");
const titulo = document.createElement("h1");
titulo.classList.add("titulo");
titulo.textContent = "Calculadora Básica";

const visorNumerico = document.createElement("p");
visorNumerico.classList.add("visorNumerico");
visorNumerico.textContent = "0";

const panelBotones = document.createElement("section");
panelBotones.classList.add("panelBotones");


app.appendChild(container);
container.appendChild(titulo);
container.appendChild(visorNumerico);
container.appendChild(panelBotones);
