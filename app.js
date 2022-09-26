// Elementos del documento HTML
const valuexl = document.getElementById("bottom-value");
const valuexu = document.getElementById("top-value");
const btnCalculate = document.getElementById("btn-calculate");

// Componentes de la Tabla de resultados
let sectionTable = document.getElementsByClassName("section-results")[0];
let table = document.createElement("table");
let tHead = document.createElement("thead");
let tBody = document.createElement("tbody");

/* Tabla */
sectionTable.appendChild(table);

// ========== Varibles Globales ========== /
let xl, xu, xr, iterador, aux;

// ========== Constantes ========== /
const iteratorsMax = 50; // -> Iteraciones Máximas
const TOL = 0.001; // -> Toleracia

// ========== Funciones ========== /

/* Función para generar los headings de la tabla */
function generateHeadingsTable() {
  /* Array de encabezados de la tabla */
  let arrEncabezados = [
    "No. Iteración",
    "xl",
    "xu",
    "xr",
    "f(xl)",
    "f(xu)",
    "f(xr)",
    "f(xl)*f(xr)",
  ];

  /* Creación de las celdas de encabezados de la Tabla */
  for (let i = 0; i < 1; i++) {
    // Crea la fila o hilera de la tabla
    let hilera = document.createElement("tr");
    for (let j = 0; j < arrEncabezados.length; j++) {
      //Celda de encabezado
      let th = document.createElement("th");
      let txtCelda = document.createTextNode(arrEncabezados[j]);
      th.appendChild(txtCelda);
      hilera.appendChild(th);
      tHead.appendChild(hilera);
    }
    // Agregar la hilera a la tabla
    table.appendChild(hilera);
  }
  table.setAttribute("border", "2");
}

/* Función para generar una tabla de resultados obtenidos */
function generateResults(i, rxl, rxu, rxr, rfxl, rfxu, rfxr, rProducto) {
  let arrResultados = [i, rxl, rxu, rxr, rfxl, rfxu, rfxr, rProducto];

  for (let f = 0; f < 1; f++) {
    let grupCelda = document.createElement("tr");
    for (let c = 0; c < arrResultados.length; c++) {
      /* Celdas de resultados */
      let celda = document.createElement("td");
      let txtCelda = document.createTextNode(arrResultados[c]);
      celda.appendChild(txtCelda);
      grupCelda.appendChild(celda);
      tBody.appendChild(grupCelda);
    }
    table.appendChild(grupCelda);
  }

  /* Agregando a la tabla el cuerpo con resultados */
  table.appendChild(tBody);
  table.setAttribute("border", "2");
}

// Función variable real
function f(x) {
  //return Math.pow(x, 4) + 3 * Math.pow(x, 3) - 2;
  return Math.pow(x, 3) - 7 * Math.pow(x, 2) + 14 * Math.pow(x, 1) - 6;
}

// Función que ejecuta el método de biseccion
function biseccion() {
  /*
   * Intervalo [xl, xu]
   * Particiones sucesiva en intervalos
   * [xl, xr] <- izquierdo
   * [xr, xu] -> derecho
   */

  generateHeadingsTable();

  // Valores que vienen de los inputs
  xl = Number.parseFloat(valuexl.value);
  xu = Number.parseFloat(valuexu.value);

  aux = xl; // -> Variable auxiliar de almacenamiento
  xr = xu;
  iterador = 1;

  //Math.abs(aux - xr) > TOL

  if (f(xl) * f(xu) > 0) {
    alert("La función no cambia de signo");
  } else {
    while (iterador < iteratorsMax) {
      aux = xr;
      xr = (xl + xu) / 2;
      generateResults(iterador, xl, xu, xr, f(xl), f(xu), f(xr), f(xl) * f(xr));
      console.log(
        `\t No. Iteración: ${iterador},
        \t Intervalo inferior xl: ${xl}
        \t Intervalo superior xu: ${xu}
        \t Punto medio xr: ${xr}
        \t Valor del la función evaluada en el punto f(xl): ${f(xl)}
        \t Valor del la función evaluada en el punto f(xu): ${f(xu)}
        \t Valor del la función evaluada en el punto f(xr): ${f(xr)}`
      );
      // Cambio de signo en el intervalo [xl, xr] <- Izquierda
      if (f(xl) * f(xr) < 0) {
        xu = xr;
      }
      // Cambio de signo en el intervalo [xr, xu] -> Derecha
      if (f(xr) * f(xu) < 0) {
        xl = xr;
      }
      iterador += 1;
    }
    console.log(
      `Iteración No: ${iterador} con valor en el punto medio xr: ${xr} es una buena aproximación a 0`
    );

    /* Info */
    const info = document.createElement("p");
    info.innerHTML = `Iteración No: ${iterador} con valor en el punto medio xr: ${xr} es una buena aproximación a 0 :)`;
    sectionTable.appendChild(info);
  }
}

btnCalculate.addEventListener("click", biseccion);
