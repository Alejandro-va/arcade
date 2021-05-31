const contenedor = document.querySelector('.contenedor');
//Definicion de medidas
const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;
const anchoBloque = 100;

//Definicion de medidas
class Bloque{
  constructor(ejeX, ejeY){
    this.bottomLeft = [ejeX, ejeY];//abajo izquierda  
    this.bottomRight = [ ejeX + anchoBloque, ejeY];//abajo derecha
    this.topLeft = [ejeX, ejeY + altoBloque];//arriba izquierda
    this.topRight = [ejeX + anchoBloque, ejeY + altoBloque];//arriba derecha
  }
}

//Definir todos los bloques que van dentro del container
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
    const bloque = document.createElement('div');//creo un div
    bloque.classList.add('bloque');//le añado la clase css .bloque
    bloque.style.left = bloques[i].bottomLeft[0]+'px';//x
    bloque.style.bottom = bloques[i].bottomLeft[1]+'px';//y
    contenedor.appendChild(bloque)
  }
}
addBloques()