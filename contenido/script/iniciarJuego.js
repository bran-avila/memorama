class carta {
    constructor( url, posicionImg, posicionImgPar) {
        this.url = url;
        this.posicionImg = posicionImg;
        this.posicionImgPar = posicionImgPar;
    }
}

let cartasFondos = document.querySelectorAll(".cara1");

let arregloImgCartas = ["../contenido/img/carta1.jpg","../contenido/img/carta2.jpg",
        "../contenido/img/carta3.jpg","../contenido/img/carta4.webp","../contenido/img/carta5.png","../contenido/img/carta6.png"];

let arregloposiciones = [1,2,3,4,5,6,7,8,9,10,11,12];

let arregloPosicionHermano =[];

let cantidadDenumeros = arregloposiciones.length;

let contador = (cantidadDenumeros/2)-1;

let contador2 = 0;

let verificacion = false;

let arregloCartas = [];

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