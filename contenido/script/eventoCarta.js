let cartas = document.querySelectorAll(".piezaMemorama");

let caraFrentes = document.querySelectorAll(".cara2");

let cartaAux = null;

let cartaActual = null;
 
let contClick = 0;

let cont = 0;

let contTurnos = 0;



const mostrarCarta = function (objCarta,posicion){
    objCarta.style.transform = "rotateY(180deg)";
    setTimeout(function() {
        caraFrentes[posicion].style.zIndex = "-1";
    },250);
};

const ocultarCarta = function (objCarta,posicion){
    objCarta.style.transform = "rotateY(0deg)";
    setTimeout(function() {
        caraFrentes[posicion].style.zIndex = "1";
    },250);
};

cartas.forEach( (carta,i)=>{
     //carta.interacion = 0; aqui tratamos de crear una variable adentro del objecto carta que es del DOM pero para darles valores solo sirve adentro del action listener como la linea 39
    //carta.contClick1=0; no funciona de nada de inicializarlo afuera solo funciona adentro de la funcion para obtener datos
    

    carta.contador = 0;
    carta.addEventListener("click",e=>{
        console.log(this.contador);
       this.interacion = i;
        console.log(caraFrentes[this.interacion]);
        if(e.target === caraFrentes[this.interacion]){//verificamos que el elemento hijo que tocamos no sea la carta ya volteada
            mostrarCarta(e.currentTarget,this.interacion);
            cont++;
            if(cont == 2 ){
                cartaActual = e.currentTarget;
                cartaActual.interacion = this.interacion;
                
                let cartaPosicion = arregloCartas.findIndex(carta => carta.posicionImg === cartaActual.interacion || carta.posicionImgPar === cartaActual.interacion);//busca adentro del arreglo de cartas que tienen su pareja de posiciones
                //que la posicion de la carta que realizo el evento sea igual a un numero de la pareja de cartas y lo compara con sus 2 numeros que tiene el objecto y si uno es verdadero regresa la posicion de donde se encuentra el objecto adentro del arreglo 
                if(!((arregloCartas[cartaPosicion].posicionImg === cartaActual.interacion && arregloCartas[cartaPosicion].posicionImgPar === cartaAux.interacion) ||
                 (arregloCartas[cartaPosicion].posicionImg === cartaAux.interacion && arregloCartas[cartaPosicion].posicionImgPar === cartaActual.interacion))){//compara si el par de numero que tiene el objecto que guarda el par con la respuesta correcta es igual a las 2 cartas que voltearon 
                    setTimeout(function() {//si es true lo pode la contraria por el ! y lo hace false y no entra el if pero si el par es incorrecto es false la contraria es true y entra el if y voltea las cartas
                        ocultarCarta(cartaActual,cartaActual.interacion);
                        ocultarCarta(cartaAux,cartaAux.interacion);    
                    },500);
            }
                cont=0;
            }else if (cont == 1){
            cartaAux = e.currentTarget;
            cartaAux.interacion = this.interacion;
        }
    }
    });
});
