
    let max = 30;
    let matriz = new Array(max);
    let contenedor2 = document.querySelector("#contenedor2");
    let btn = document.querySelector("#btn");
    let btn1 = document.querySelector("#btn1");
    let btn2 = document.querySelector("#btn2");
    let btn3 = document.querySelector("#btn3");
    btn.addEventListener("click", Creartabla);
	btn1.addEventListener("click",valorMaximo);
	btn2.addEventListener("click",parMaxImparMin);
	btn3.addEventListener("click",valorPromedio);
    
    function inicializar() {
        for (i = 0; i < max; i++) {
            matriz[i] = new Array(this.max);
        }
        for (i = 0; i < max; i++) {
            for (e = 0; e < max; e++) {
                matriz[i][e] = valorRandom();
            }
        }
        for (i = 0; i < this.max; i++) {
            for (e = 0; e < this.max; e++) {}
        }
    }

    function Creartabla() {
        inicializar();
        let body = document.getElementsByTagName("body")[0];        
        let tabla = document.createElement("table");
        let tblBody = document.createElement("tbody");
        for (let i = 0; i < max; i++) {
            let hilera = document.createElement("tr");
            for (let j = 0; j < max; j++) {
                let celda = document.createElement("td");
                let textoCelda = document.createTextNode(" " + matriz[i][j]);
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            tblBody.appendChild(hilera);
        }
        tabla.appendChild(tblBody);
        body.appendChild(tabla);
        tabla.setAttribute("border", "2");
        mostrarBotons();
    }
    function mostrarBotons() {
        btn.style.display = 'none';
        btn1.style.display = 'inline';
        btn2.style.display = 'inline';
        btn3.style.display = 'inline';

    }
    function valorRandom() {
        return Math.floor(Math.random() * (10000));
    }

    function valorMaximo() {
        let aux = -1;
        for (i = 0; i < max; i++) {
            for (e = 0; e < max; e++) {
                if (matriz[i][e] > aux) {
                    aux = matriz[i][e];
                }
            }
        }
        console.log(aux);
        btn1.style.display = 'none';
        contenedor2.insertAdjacentText("beforebegin"," Valor Maximo: " +  aux  + "----");
        return aux;
       
    }

    function parMaxImparMin() {
        let aux = [];
        let maximo = 0;
        let minimo = 99999;
        for (let i = 0; i < max; i++) {
            if (!(i % 2)) {
                for (let e = 0; e < max; e++) {
                    if (matriz[i][e] > maximo) {
                        maximo = matriz[i][e];
                    }
                }
            } else {
                for (let e = 0; e < max; e++) {
                    if (matriz[i][e] < minimo) {
                        minimo = matriz[i][e];
                    }
                }
            }
        }
        console.log(maximo, minimo);
        btn2.style.display = 'none';
        contenedor2.insertAdjacentText("beforebegin"," Par Max: " +  maximo  + "----" + " Impar Min: "+ minimo + "----"); 
    }

    function valorPromedio() {
        let arrayAux = [];
        let aux = 0;
        for (let i = 0; i < max; i++) {
            for (let e = 0; e < max; e++) {
                aux = matriz[i][e];
            }
            arrayAux[i] = aux / e;
            aux = 0;
        }
        console.log(arrayAux);
        btn3.style.display = 'none';
        contenedor2.insertAdjacentText("beforebegin"," Valores Promedio:" +  arrayAux);
    }
