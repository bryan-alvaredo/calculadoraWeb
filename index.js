let operador = "";
let num1 = "";
let num2 = "";
let decimal = false;
let modoOscuro = true;

const crearBoton = (texto, handler) => {
  const boton = document.createElement("button");
  if (texto === "/" || texto === "*" || texto === "+" || texto === "-") {
    boton.classList.add("operador");
  } else if (texto === "=") {
    boton.classList.add("igual");
  } else {
    boton.classList.add(texto);
  }
  boton.textContent = texto;
  boton.addEventListener("click", handler);
  return boton;
};

const agregarNumero = (numero) => {
  if (operador === "") {
    num1 += numero;
    document.getElementById("resultado").value = num1;
  } else {
    num2 += numero;
    document.getElementById("resultado").value = num1 + operador + num2;
  }
};

const convertirEnDecimal = () => {
  if (!decimal) {
    if (operador === "") {
      if (num1 === "") {
        num1 += "0.";
      } else {
        num1 += ".";
      }
      document.getElementById("resultado").value = num1;
    } else {
      if (num2 === "") {
        num2 += "0.";
      } else {
        num2 += ".";
      }
      document.getElementById("resultado").value = num2;
    }
    decimal = true;
  }
};

const calcular = () => {
  let resultado;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (operador) {
    case "+":
      resultado = n1 + n2;
      break;
    case "-":
      resultado = n1 - n2;
      break;
    case "*":
      resultado = n1 * n2;
      break;
    case "/":
      resultado = n1 / n2;
      break;
    default:
      resultado = "Error";
      break;
  }

  document.getElementById("resultado").value = resultado;
  num1 = resultado.toString();
  num2 = "";
  operador = "";
  decimal = false;
};

const setOperador = (op) => {
  operador = op;
  decimal = false;
  document.getElementById("resultado").value = num1 + operador;
};

const handlerClickBoton = (event) => {
  const valorBoton = event.target.textContent;

  if (valorBoton === "=") {
    if (num1 !== "" && num2 !== "" && operador !== "") {
      calcular();
    }
  } else if (valorBoton === ".") {
    convertirEnDecimal();
  } else if (
    valorBoton === "+" ||
    valorBoton === "-" ||
    valorBoton === "*" ||
    valorBoton === "/"
  ) {
    setOperador(valorBoton);
  } else {
    agregarNumero(valorBoton);
  }
};

const limpiarPantalla = () => {
  operador = "";
  num1 = "";
  num2 = "";
  decimal = false;
  document.getElementById("resultado").value = "";
};

const borrarCaracter = () => {
  if (num2 !== "" && operador !== "") {
    num2 = num2.slice(0, -1);
    document.getElementById("resultado").value = num1 + operador + num2;
  } else if (operador !== "") {
    operador = "";
    document.getElementById("resultado").value = num1;
  } else if (num1 !== "") {
    num1 = num1.slice(0, -1);
    document.getElementById("resultado").value = num1;
  }
};

const tema = () => {
  const botones = document.querySelectorAll("button");
  if (modoOscuro) {
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("./img/fondoOscuroPrincipal.png")`;
    document.querySelector("main").style.borderColor = "white";
    document.querySelector("main").style.backgroundColor =
      "rgb(124 124 124 / 33%)";
    document.querySelector("i").style.color = "white";
    document.querySelector("h1").style.color = "white";
    document.querySelector("input").style.backgroundColor = "black";
    document.querySelector("input").style.color = "silver";
    document.querySelector("input").style.borderColor = "silver";
    botones.forEach((boton) => {
      if (boton.className.includes("operador")) {
        boton.classList.toggle("darkOperador");
      } else if (boton.className.includes("igual")) {
        boton.classList.toggle("darkIgual");
      } else if (boton.className.includes("borrar")) {
        boton.classList.toggle("darkButtonDel");
      } else {
        boton.classList.toggle("darkNumeros");
      }
    });
    modoOscuro = !modoOscuro;
  } else {
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("./img/fondoClaroPrincipal.png")`;
    document.querySelector("main").style.borderColor = "black";
    document.querySelector("main").style.backgroundColor =
      "rgba(255, 255, 255, 0.589)";
    document.querySelector("i").style.color = "black";
    document.querySelector("h1").style.color = "black";
    document.querySelector("input").style.backgroundColor = "white";
    document.querySelector("input").style.color = "black";
    document.querySelector("input").style.borderColor = "black";
    botones.forEach((boton) => {
      if (boton.className.includes("operador")) {
        boton.classList.toggle("darkOperador");
      } else if (boton.className.includes("igual")) {
        boton.classList.toggle("darkIgual");
      } else if (boton.className.includes("borrar")) {
        boton.classList.toggle("darkButtonDel");
      } else {
        boton.classList.toggle("darkNumeros");
      }
    });
    modoOscuro = !modoOscuro;
  }
};

//paneles
const iniciarCalculadora = () => {
  const app = document.getElementById("app");
  const container = document.createElement("main");
  container.classList.add("container");
  app.appendChild(container);
  const iconoTema = document.createElement("i");
  iconoTema.classList.add("fa-solid");
  iconoTema.classList.add("fa-circle-half-stroke");
  iconoTema.addEventListener("click", tema);
  container.appendChild(iconoTema);
  const titulo = document.createElement("h1");
  titulo.classList.add("titulo");
  titulo.textContent = "Calculadora Básica";
  container.appendChild(titulo);
  const visorNumerico = document.createElement("input");
  visorNumerico.id = "resultado";
  visorNumerico.type = "text";
  visorNumerico.readOnly = true;
  container.appendChild(visorNumerico);
  const panelBotones = document.createElement("section");
  panelBotones.classList.add("panelBotones");
  container.appendChild(panelBotones);
  const botonBorrado = document.createElement("article");
  botonBorrado.classList.add("botonBorrado");
  panelBotones.appendChild(botonBorrado);
  const numerosyFunciones = document.createElement("section");
  numerosyFunciones.classList.add("numerosyFunciones");
  panelBotones.appendChild(numerosyFunciones);
  const botonLimpiar = crearBoton("C", limpiarPantalla);
  botonLimpiar.classList.add("borrar");
  botonBorrado.appendChild(botonLimpiar);
  const borrar = crearBoton("DEL", borrarCaracter);
  borrar.classList.add("borrar");
  botonBorrado.appendChild(borrar);

  const botones = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  botones.forEach((tecla) => {
    const boton = crearBoton(tecla, handlerClickBoton);
    numerosyFunciones.appendChild(boton);
  });
};

document.addEventListener("DOMContentLoaded", iniciarCalculadora);
