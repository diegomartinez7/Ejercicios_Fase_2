//Christopher Diego Martínez Bernal

function ejercicio1(){
    /* -Obtenemos el valor del input que captura el número de 32 bits
       -Convertimos el valor a int y después lo redondeamos en caso de que tenga punto decimal */
    let numero = Math.floor(parseInt(document.getElementById('direccion').value));
    let residuo = 0, arreglo = [];  //inicializamos el residuo en 0 y un arreglo para los 32 bits

    //Comprobamos que se trate de un número de 32 bits válido
    if(numero >= 0 && numero <= 4294967295){
        //Iteramos hasta que el dividendo sea diferente de 0
        do{
            //Usamos Math.floor() para trabajar sólo con números enteros
            residuo = Math.floor(numero % 2);  //actualizamos el residuo
            numero = Math.floor(numero / 2);  //actuaizamos al dividendo con cada cociente
            arreglo.push(residuo);  //añadimos el residuo de cada iteración al arreglo
        }while(numero != 0);

        //Declaramos un índice para usar en el for, que empiece desde el tamaño máximo del arreglo
        let i = arreglo.length;
        for(; i<32; i++){
            arreglo.push(0);  //añadimos un 0 por cada posición faltante hasta completar 32 espacios
        }
        arreglo.reverse();  //invertimos el orden de los elementos

        //Un vector para cada byte extraíble de los 32 bits y una variable que concatenará la IP
        let miByte = [], dirIP4 = "";

        //El for sólo necesita 4 iteraciones, pues sólo hay 4 bytes en 32 bits
        for(let j = 0; j<4; j++){
            let acumulador = 0;  //acumulador de IPv4
            miByte = arreglo.splice(0,8);  //en cada vuelta obtenemos un byte para manipular
            for(let k = 0; k<8; k++){
                //Acumulamos las multiplicaciones de cada bit por la potencia de 2 que le corresponda
                acumulador += Math.pow(2,7-k) * miByte[k];
            }

            //Agregamos un punto entre cada octeto exceptuando al último
            dirIP4 += (j == 3)? acumulador : acumulador + ".";
        }
        
        document.getElementById('direccion').value = dirIP4;  //actualizamos el input con el valor de la IPv4
    }
    else{
        //No se ingresó un número válido
        document.getElementById('direccion').value = "Número ingresado incorrecto";
    }

}

function ejercicio2(){
    let secuencia = document.getElementById('vector').value;  //variable para extraer la serie de números
    let resultado = document.getElementById('suma').value;  //variable para guardar la suma esperada
    let bandera = 0;  //bandera que ayuda a separar correctamente los valores separados por comas o espacios

    //Obtenemos un vector puramente de los números de la serie, sin comas, espacios u otro caracter
    secuencia = obtenerSerie(secuencia);
    //Imprimimos el vector en consola para corroborar que puede almacenar una gran cantidad de elementos
    console.log(secuencia);

    /* -Una variable que se actualiza de acuerdo a la distancia menor entre dos números
       -Posición 1: Posición del primer número que conforma el par
       -Posición 2: Posición del segundo número que conforma el par*/
    let menor = secuencia.length, pos1 = 0, pos2 = 0; 
    for(let i = 0; i<secuencia.length; i++){
        //Iteramos en cada posible combinación del número en la posición i con todos los demás menos él mismo
        for(let j = i+1; j<secuencia.length; j++){
            //Si la suma del número en la posición i con el número de la posición actual j es igual a la suma
            if((parseInt(secuencia[i])+parseInt(secuencia[j]))==parseInt(resultado)){
                if((j-i) < menor){  //si la distancia entre ellos es menor que el valor de "menor"
                    pos1 = i;  //actualizamos a la posición 1 nueva
                    pos2 = j;  //actualizamos a la posición 2 nueva
                    menor = j-i;  //actualizamos la distancia menor entre los números del par
                    //Como j sólo puede aumentar, no habrá combinación con distancia menor y mejor aumentamos i
                    break;
                }
            }
        }
    }

    //Cadena que concatena el mensaje para el usuario
    let cadena;
    if(pos1 != pos2){  //si las posiciones no son iguales, entonces sí se encontró un par
        cadena = 'El par más cercano que produce la suma es: ['+secuencia[pos1]+','+secuencia[pos2]+']';
        cadena += "\nPosiciones "+pos1+" y "+pos2;
        console.log(cadena);
        alert(cadena);  //mandamos el mensaje en una alerta
    }
    else{  //no se encontró ningún par que cumpla con la sumatoria
        cadena = 'null\nNo se encontró un par cuya suma sea equivalente a la esperada';
        console.log(cadena);
        alert(cadena);
    }

}

//Regresa un vector válido a partir de la entrada del usuario
function obtenerSerie(sec){
    //Bandera para saber si se añade otro número, cadena que acumula los dígitos de un número y el vector
    let band = 0, numeroAcum = "", serie = [];

    //Ciclo para comprobar posición por posición la cadena "sec" de entrada
    for(let i = 0; i<=sec.length; i++){
        //Si no se trata de un caracter inválido, pero sí de un número o un signo menos
        if((Number.isInteger(parseInt(sec[i])) && sec[i]!='') || sec[i]=='-'){
            band = 0;  //cambiamos el estado de la bandera a 0
            numeroAcum += sec[i];  //armamos el número dígito por dígito (aunque sólo posea uno)
        }
        else{
            if(band==0){  //encontramos un caracter inválido y entramos a agregar el número que llevábamos
                band = 1;  //si se sigue encontrando caracteres inválidos permite que no se añada cada vez
                serie.push(numeroAcum);  //añadimos el número que teníamos construido de momento al vector
                numeroAcum = "";  //reiniciamos la cadena para números
            }
        }
    }

    return serie;  //retornamos el vector puro
}