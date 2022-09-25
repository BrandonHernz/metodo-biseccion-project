// Elementos del documento HTML
const valuexl = document.getElementById("bottom-value");
const valuexu = document.getElementById("top-value");
const btnCalculate = document.getElementById("btn-calculate");

// Varibles Globales
let xl, xu, xr, iterador, aux;

// Constantes
const iteratorsMax = 50; // -> Iteraciones Máximas
const TOL = 0.001; // -> Toleracia

// Función variable real
function f(x) {
  return Math.pow(x, 4) + 3 * Math.pow(x, 3) - 2;
}

// Función que ejecuta el método de biseccion
function biseccion() {
  /*
   * Intervalo [xl, xu]
   * Particiones sucesiva en intervalos
   * [xl, xr] <- izquierdo
   * [xr, xu] -> derecho
   */

  // Valores que vienen de los inputs
  xl = Number.parseFloat(valuexl.value);
  xu = Number.parseFloat(valuexu.value);

  aux = xl; // -> Variable auxiliar de almacenamiento
  xr = xu;
  iterador = 1;

  //Math.abs(m1 - xr) > TOL

  if (f(xl) * f(xu) > 0) {
    alert("La función no cambia de signo");
  } else {
    while (iterador < iteratorsMax) {
      aux = xr;
      xr = (xl + xu) / 2;
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
      `Iteración No: ${iterador} con valor en el punto medio xr: ${xr} es una buena aproximación`
    );
  }
}

btnCalculate.addEventListener("click", biseccion);
