const contenedor = document.querySelector('.contenedor');
//Definicion de medidas
const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;//esta definicion de tamaño esta en css, pero tambien la pongo aca para usarla en la clase bloq como variable
const anchoBloque = 100;

//definir posicion Usuario
const posicionInicialUsuario = [230, 10];
let posicionActualUsuario = posicionInicialUsuario;
let velocidadUsuario = 15;

//Definir posicion de la bola
const posicionInicialBola = [270, 40];
let posicionActualBola = posicionInicialBola;

//Definicion particularidad de la bola
let xDireccionBola = 2;
let yDireccionBola = 2;
let diametro = 20;//tamaño de la bola

//definir timer
let timerID

//Definicion de la clase bloque
class Bloque{
   //aki tomo las variables alto y ancho bloque pq para definir los tamaños cuando los pinte
  constructor(ejeX, ejeY){
    this.bottomLeft = [ejeX, ejeY];//abajo izquierda  
    this.bottomRight = [ ejeX + anchoBloque, ejeY];//abajo derecha
    this.topLeft = [ejeX, ejeY + altoBloque];//arriba izquierda
    this.topRight = [ejeX + anchoBloque, ejeY + altoBloque];//arriba derecha
  }
}

//Definir el eje "x" y "y" de todos los bloques que van dentro del container
const bloques = [
  //linea 1
  new Bloque(10, 250), //x , y
  new Bloque(120, 250),
  new Bloque(230, 250),
  new Bloque(340, 250),
  new Bloque(450, 250),
  //linea 2
  new Bloque(10, 220),
  new Bloque(120, 220),
  new Bloque(230, 220),
  new Bloque(340, 220),
  new Bloque(450, 220),
    //linea 3
  new Bloque(10, 190),
  new Bloque(120, 190),
  new Bloque(230, 190),
  new Bloque(340, 190),
  new Bloque(450, 190),
]

//Function añadir bloques que
function addBloques(){
  for(let i = 0 ; i< bloques.length; i++){//recorro el array bloques
   //console.log(i)
    const bloque = document.createElement('div');//creo un div
    bloque.classList.add('bloque');//le añado la clase css .bloque

    //estoy entrando al array bloques y a la clase bloq, pero solo a la primera opcion de la clase, "bottomLeft"
    bloque.style.left = bloques[i].bottomLeft[0]+'px';//x
    //console.log("x:",bloque.style.left)
    bloque.style.bottom = bloques[i].bottomLeft[1]+'px';//y
    //console.log("y:",bloque.style.bottom)

    contenedor.appendChild(bloque)
  }
}
//Añadir los bloques al juego
addBloques()

//Definir usuario
function dibujarUsuario() {//va redibujar el usuario todo el juego
   usuario.style.left = posicionActualUsuario[0]+'px'; //x
   usuario.style.bottom = posicionActualUsuario[1]+'px'; //y
}

//Añadir Usuario
const usuario = document.createElement('div');
usuario.classList.add('usuario');
contenedor.appendChild(usuario);
dibujarUsuario()

//Mover al usuario por el tablero
function moverUsuario(e){
   switch (e.key) {
      case 'ArrowLeft'://nombre de la tecla, asi no le asigno numero
            if(posicionActualUsuario[0] > 0){//cero pq es el punto inical d x
               posicionActualUsuario[0] -= velocidadUsuario//le resto 10 a "x" pq son lo px q se mueve a la izquierda
               dibujarUsuario()
               //console.log( posicionActualUsuario)
            }
         break;
            case 'ArrowRight':
               if(posicionActualUsuario[0] < (anchoTablero - anchoBloque)){
                 posicionActualUsuario[0] += velocidadUsuario//le sumo 10 a "x" pq son lo px q se mueve a la derecha
                  dibujarUsuario()
               }
         break;
   }
}

//Añadir evento escuchador para el documento de
document.addEventListener('keydown', moverUsuario)

//dibujar la bola
function dibujarBola(){
  bola.style.left = posicionActualBola[0] + 'px'; //x
  bola.style.bottom = posicionActualBola[1] + 'px'; //y
}
const bola = document.createElement('div');
bola.classList.add('bola'); //agrego la clase bola
contenedor.appendChild(bola);
dibujarBola()

//aca debo dibujar todas las funciones q ejecuta la bola pq estes la function principal uso con el timer
function moverBola(){
  posicionActualBola[0] += xDireccionBola;
  posicionActualBola[1] += yDireccionBola;
  console.log(posicionActualBola[1])
  dibujarBola();
  revisarColision();
  gameOver();
}

timerID = setInterval(moverBola, 20);

function revisarColision(){
  //COLISION CON BLOQUES
  for(let i = 0; i < bloques.length; i++){//recorro el arry de bloques

      if(
        //en el eje X left es "-" y right "+", si la bola es mayor q el punto cero del bloque o menor q el punto maximo quiere decir q se encontraron (le puedo sumar el diametro de la bola a la posicion actual cuanteas vecs me de la gana) 
        ((posicionActualBola[0] + diametro)> bloques[i].bottomLeft[0] && posicionActualBola[0] <bloques[i].bottomRight[0]) &&
        //este es exactamente igual q el de arriba pero con el eje Y
      ((posicionActualBola[1] + diametro) > bloques[i].bottomLeft[1] && posicionActualBola[1] < bloques[i].topLeft[1])
      ){//creo una instacia iterable del array de la clase bloq q yo hice hace rato en el div q yo cree (los bloquecitos)
        const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
        //console.log(todosLosBloques)
        todosLosBloques[i].classList.remove('bloque')//kito la clase y abajo elimino el bloque del array
        bloques.splice(i,1)//elimino el bloq(indice, cantidad a eliminar)
        cambiarDireccion()
      }
  }//end for

  //COLISIONES CON LAS PAREDES
  if(
    //si la bola en X derecha llega (derecha pq es mayor) llega a  la pared derecha  (diametro=tamaño de bola)
      posicionActualBola[0] >= (anchoTablero - diametro) ||
      //si la bola en Y llega al piso del tablero
      posicionActualBola[1] >= (altoTablero - diametro) ||
      //si la bola en X llega a la pared izquierda
      posicionActualBola[0] <= 0 ||
      //si la bola en Y llega al tope del tablero
      posicionActualBola[1] <= 0
  ){
    cambiarDireccion()
  }

  //COLISION CON EL USUARIO
  if(
    //(si la bola es mayor en izquierda x y menor en derecha x) y (bola mayor q suarion en "y" arriba y  menor q usuarion en "Y" abajo) entncs cambia de direccion
    (posicionActualBola[0] > posicionActualUsuario[0] && posicionActualBola[0] < posicionActualUsuario[0] + anchoBloque) &&
    (posicionActualBola[1] > posicionActualUsuario[1] && posicionInicialBola[1] < posicionActualUsuario[1] + altoBloque)
  ){
    cambiarDireccion()
  }
}// end revisarColision

function gameOver() {
  if(posicionInicialBola[1] <= 0){
    clearInterval(timerID)
   /*  puntuacion.innerHTML = "Perdiste"; */
    document.removeEventListener('keydown', moverUsuario)
  }
}


//Function de cambiar la direccion
function cambiarDireccion() {
  if (xDireccionBola === 2 && yDireccionBola === 2) {//arriba-derecha
        yDireccionBola = -2 //abajo-derecha
        return
  }
  if (xDireccionBola === 2 && yDireccionBola === -2) {//abajo-derecha
    xDireccionBola = -2//abajo-izquierda
    return
  }
  if (xDireccionBola === -2 && yDireccionBola === -2) {//abajo-izquierda
    yDireccionBola = 2//arriba-izquierda
    return
  }
  if (xDireccionBola === -2 && yDireccionBola === 2) {//arriba-izquierda
    xDireccionBola = 2//arriba-derecha
    return
  }
}