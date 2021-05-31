const contenedor = document.querySelector('.contenedor');
//Definicion de medidas
const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;//esta definicion de tamaño esta en css, pero tambien la pongo aca para usarla en la clase bloq como variable
const anchoBloque = 100;

//definir posicion Usuario
const posicionInicialUsuario = [230, 10];
let posicionActualUsuario = posicionInicialUsuario;

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
               posicionActualUsuario[0] -= 10//le resto 10 a "x" pq son lo px q se mueve a la izquierda
               dibujarUsuario()
               console.log( posicionActualUsuario)
            }
         break;
            case 'ArrowRight':
               if(posicionActualUsuario[0] < (anchoTablero - anchoBloque)){
                  posicionActualUsuario[0] += 10//le sumo 10 a "x" pq son lo px q se mueve a la derecha
                  dibujarUsuario()
               }
         break;
   }
}

//Añadir evento escuchador para el documento de
document.addEventListener('keydown', moverUsuario)