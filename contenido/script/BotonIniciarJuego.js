//modo de juego

let ModoJuegoSolitario = document.querySelectorAll(".modoJuego:nth-of-type(n+1)");
let sudMenu = document.querySelector("ul.sudmenu");
let btnPrincipal = document.querySelector(".botonIniciar");
let modosJuegos = document.querySelectorAll("section.puntacion,section.Jugadores");
let tablero = document.querySelector(".tablero");
let numeroDeCartas = 12;
let arregloCartas = [];
let contadorTurnos = 0;


console.log(document.querySelectorAll(".tiempo span:nth-of-type(even)"));

ModoJuegoSolitario[0].addEventListener("click",e =>{
    if(e.target.textContent === "Solo"){
        document.querySelectorAll(".modoJuego:nth-of-type(1) ul li").forEach(element => {
            element.classList.remove("btnActivo");
            sudMenu.style.display = "none";
        });
        modosJuegos[0].style.display = " flex";
        modosJuegos[1].style.display = " none";
            e.target.classList.add("btnActivo");
    }else if(e.target.textContent === "Amigo") {
        document.querySelectorAll(".modoJuego:nth-of-type(1) ul li").forEach(element => {
            element.classList.remove("btnActivo");
            sudMenu.style.display = "none";
            });
            e.target.classList.add("btnActivo");
            modosJuegos[0].style.display = " none";
            modosJuegos[1].style.display = " flex";
    } 
    //en desarrollo
    /*else if(e.target.textContent === "Contra Computadora"){// Esta en desarrollo contra la computadora
        document.querySelectorAll(".modoJuego:nth-of-type(1) ul li").forEach(element => {
            element.classList.remove("btnActivo");
        });
        document.querySelector(".modoJuego:nth-of-type(1) ul li:nth-of-type(3)").classList.add("btnActivo");
        sudMenu.style.display = "flex";           
    }*/
});

ModoJuegoSolitario[1].addEventListener("click",e =>{
    console.log(e.target);
    document.querySelectorAll(".modoJuego:nth-of-type(2) ul li").forEach(element => {
    element.classList.remove("btnActivo");
    });
    e.target.classList.add("btnActivo");
    if(e.target.textContent === "4x3"){
        tablero.style.grid = " repeat(3,1fr)/repeat(4,1fr)";
        numeroDeCartas = 12;
        }else if(e.target.textContent === "4x4"){
            tablero.style.grid = " repeat(4,1fr)/repeat(4,1fr)";
            numeroDeCartas = 16;
            }else if(e.target.textContent === "4x5"){
                tablero.style.grid = " repeat(5,1fr)/repeat(4,1fr)";
                numeroDeCartas = 20;
            }
});





btnPrincipal.addEventListener("click",e =>{
    algoritmoIniciarPosicionesLasCartas();
    iniciarEventosCartas();
    iniciarTemporizador();
});

const  iniciarTemporizador = function(){
    let reloj = document.querySelectorAll(".tiempo span:nth-of-type(even)");
    let horas = reloj[0];
    let minutos = reloj[1];
    let segundos =reloj[2];
    let contadorSegundos = 0;
    let contadorMinutos = 0;
    let contadorHoras = 0;
    setInterval(() => {
        contadorSegundos++;
        if(contadorSegundos < 10 ){
            segundos.textContent = "0"+contadorSegundos;
        }else{
            segundos.textContent = contadorSegundos;
        }
        if(contadorSegundos === 60){
            contadorSegundos = 0;
            segundos.textContent = "0"+contadorSegundos;
            contadorMinutos++;
            if(contadorMinutos < 10 ){
                minutos.textContent = "0"+contadorMinutos;
            }else{
                minutos.textContent = contadorMinutos;
            }
            if(contadorMinutos === 60){
                contadorMinutos = 0;
                minutos.textContent = "0"+contadorMinutos;
                contadorHoras++;
                if(contadorMinutos < 10 ){
                    horas.textContent = "0"+contadorHoras;
                }else{
                    horas.textContent = contadorHoras;
                }   
            }
        }

    }, 1000);
};


const  iniciarEventosCartas = function(){

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

let contadorclick = 0;
let targetAnterior = null;

cartas.forEach( (carta,i)=>{
     //carta.interacion = 0; aqui tratamos de crear una variable adentro del objecto carta que es del DOM pero para darles valores solo sirve adentro del action listener 
    carta.addEventListener("click",e=>{
       this.interacion = i;//aqui si se le puede dar un valor al objecto carta a su eventlistener para que cada eventlistener tenga su posicion para saber que carta hicimos click y compararlo con los demas objectos 
        console.log(caraFrentes[this.interacion],e.target);        
        contadorclick++;
        if(contadorclick > 1 && e.target != targetAnterior ){
            contadorclick = 1;
        }
        if (contadorclick === 0 && e.target === targetAnterior){
            contadorclick = 2;
        }

        if(e.target === caraFrentes[this.interacion] && contadorclick === 1){//verificamos que el elemento hijo que tocamos no sea la carta ya volteada
            mostrarCarta(e.currentTarget,this.interacion);
            cont++;
            targetAnterior = e.target;
            console.log(targetAnterior);
            if(cont == 2){
                cartaActual = e.currentTarget;
                cartaActual.interacion = this.interacion;
                
                let cartaPosicion = arregloCartas.findIndex(carta => carta.posicionImg === cartaActual.interacion || carta.posicionImgPar === cartaActual.interacion);//busca adentro del arreglo de cartas que tienen su pareja de posiciones
                //que la posicion de la carta que realizo el evento sea igual a un numero de la pareja de cartas y lo compara con sus 2 numeros que tiene el objecto y si uno es verdadero regresa la posicion de donde se encuentra el objecto adentro del arreglo 
                if(!((arregloCartas[cartaPosicion].posicionImg === cartaActual.interacion && arregloCartas[cartaPosicion].posicionImgPar === cartaAux.interacion) ||
                 (arregloCartas[cartaPosicion].posicionImg === cartaAux.interacion && arregloCartas[cartaPosicion].posicionImgPar === cartaActual.interacion))){//compara si el par de numero que tiene el objecto que guarda el par con la respuesta correcta es igual a las 2 cartas que voltearon 
                    setTimeout(function() {//si es true lo pode la contraria por el ! y lo hace false y no entra el if pero si el par es incorrecto es false la contraria es true y entra el if y voltea las cartas
                        ocultarCarta(cartaActual,cartaActual.interacion);
                        ocultarCarta(cartaAux,cartaAux.interacion);
                        contadorTurnos++;
                        document.querySelector(".turnos span:last-of-type").textContent = contadorTurnos;
                    },500);
                    contadorclick = 0;
            }else{
                contadorclick = 0;
                contadorTurnos++;
                document.querySelector(".turnos span:last-of-type").textContent = contadorTurnos;
            }
                cont=0;
            }else if (cont == 1){
            cartaAux = e.currentTarget;
            cartaAux.interacion = this.interacion;
        }
    }
    });
});

}

class carta {
    constructor( url, posicionImg, posicionImgPar) {
        this.url = url;
        this.posicionImg = posicionImg;
        this.posicionImgPar = posicionImgPar;
    }
}


const algoritmoIniciarPosicionesLasCartas =  function (){


 
    let cartasFondos = document.querySelectorAll(".cara1");
    
    let arregloImgCartas = ["../contenido/img/carta1.jpg","../contenido/img/carta2.jpg",
            "../contenido/img/carta3.jpg","../contenido/img/carta4.webp","../contenido/img/carta5.png","../contenido/img/carta6.png",
            "../contenido/img/carta7.jpg","../contenido/img/carta8.jpg","../contenido/img/carta9.jpg","../contenido/img/carta10.jpg"];
    
    let arregloposiciones = [];
   
    for (let i = 0; i < numeroDeCartas; i++) {
        arregloposiciones.push(i+1);
    }

    let arregloPosicionHermano =[];
    
    let cantidadDenumeros = arregloposiciones.length;
    
    let contador = (cantidadDenumeros/2)-1;
    
    let contador2 = 0;
    
    let verificacion = false;
    
    //let arregloCartas = [];
    
    console.log(contador,contador2);
    
    while(contador >= contador2){//el contador  vale 5 y el segundo contador vale 0 y como es contador uno es mayor que el dos entonces cumple el bucle while hasta que el contador 2 sea mayor
        console.log("adentro while 1 ");
        console.log(contador,contador2);
        while(!verificacion){//la variable verificacion es false y el contrario es true y entra en el while 
            console.log("adentro while 2");
            let numPosicion = Math.round(Math.random()*cantidadDenumeros);//se crea un numero areatorio con el limite de las cartas que haya en el juego
            let PosicionNumero = arregloposiciones.indexOf(numPosicion);//indexIf busca adentro del arreglo si existe el numero y regresa la posicion donde se encuentra
            if(PosicionNumero !== -1){//comparamos que sea diferente a  -1 porque indexOf regresa -1 cuando no encuentra el valor adentro del arreglo
                verificacion = true;//podemos que es true para que termine el ciclo while interno
                arregloposiciones.splice(PosicionNumero,1);//metodo splice remplaza o elimina, el primer argumento pide la posicion en numero para eliminar o remplazar o un dato no numerico como string para buscarlo y remplazarlo y el segundo argumento es cuanto remplazar que es uno
                arregloPosicionHermano.push(numPosicion);//agregamos el numero areatorio en otro arreglo
                console.log(numPosicion,arregloposiciones);
            }
        }
        verificacion = false;//podemos false porque reinicia el valor para poder entra en while interior  
        contador2++;//el contador aumenta mas uno por cada ciclo hasta superar el contador uno y terminar el ciclo
    }
    
    console.log("arreglo 1: ",arregloposiciones," arreglo 2: ",arregloPosicionHermano);
    
    
    //llenar cartas con imagenes y el objecto
    
    
    
    for (let i = 0; i < arregloposiciones.length; i++) {
        cartasFondos[arregloposiciones[i]-1].style.backgroundImage ="url("+arregloImgCartas[i]+")";
        cartasFondos[arregloPosicionHermano[i]-1].style.backgroundImage ="url("+arregloImgCartas[i]+")"; 
        let objcarta = new carta(arregloImgCartas[i],arregloposiciones[i]-1,arregloPosicionHermano[i]-1);
        arregloCartas.push(objcarta);
    }
    
    console.log(arregloCartas);
    
}


//Este boton todavia esta en desarrollo
sudMenu.addEventListener("click",e =>{

   

});