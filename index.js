let operador = "";
let num1 = "";
let num2 = "";
let decimal = false;

const crearBoton = (texto, handler) => {
  const boton = document.createElement("button");
  boton.classList.add(texto);
  boton.textContent = texto;
  boton.addEventListener("click", handler);
  return boton;
};

const agregarNumero = (numero) => {
  if (operador === "") {
    console.log("entra num1")
    num1 += numero;
    document.getElementById("resultado").value = num1;
  } else {
    console.log("entra num2")
    num2 += numero;
    document.getElementById("resultado").value = num1+operador+num2;
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
  document.getElementById("resultado").value = num1+operador
};

const handlerClickBoton = (event) => {
  const valorBoton = event.target.textContent;
  console.log("valor del boton presionado",valorBoton)

  if (valorBoton === "=") {
    if (num1 !== "" && num2 !== "" && operador !== "") {
      console.log("entrando")
      calcular();
    }
  } else if (valorBoton === ".") {
    convertirEnDecimal();
  } else if (valorBoton === "+" || valorBoton === "-" || valorBoton === "*" || valorBoton === "/") {
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

const borrarElemento = () => {
  console.log("borrar elemento")
}

//paneles
const iniciarCalculadora = () => {
  const app = document.getElementById("app");
  const container = document.createElement("section");
  container.classList.add("container");
  app.appendChild(container);
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
  const botonesBorrado = document.createElement("article");
  botonesBorrado.classList.add("botonesBorrado");
  panelBotones.appendChild(botonesBorrado);
  const numerosyFunciones = document.createElement("section");
  numerosyFunciones.classList.add("numerosyFunciones");
  panelBotones.appendChild(numerosyFunciones);
  const botonLimpiar = crearBoton("C", limpiarPantalla);
  botonesBorrado.appendChild(botonLimpiar);
  const borrar = crearBoton("DEL", borrarElemento)
  botonesBorrado.appendChild(borrar);

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
