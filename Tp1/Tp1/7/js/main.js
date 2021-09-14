var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
let imageData;
let imageAspectRadio;
let imageAspectWidth;
let imageAspectHeight;
let filtrobtn = document.getElementById('filtro');    
document.querySelector('.ifile').addEventListener("change",cargarImagen);
filtrobtn.addEventListener('click', filtroimagen);    
    
    function cargarImagen(event){
        filtrobtn.style.display = 'inline';
        let file = event.target.files[0];
        let fr = new FileReader();
        fr.onload = function(){ 
                let img = new Image();
                img.onload = function(){ 
                    if(this.height > this.width){
                        imageAspectRadio = (1.0 * this.height) / this.width;
                        imageAspectWidth = canvas.width;
                        imageAspectHeight = canvas.width * imageAspectRadio;
                }  else{
                    imageAspectRadio = (1.0 * this.width) / this.height;
                    imageAspectWidth = canvas.height * imageAspectRadio;
                    imageAspectHeight = canvas.height;
                }
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img,0,0);         
                imageData = ctx.getImageData(0, 0, img.width, img.height);
                }
                img.src = fr.result;
            }; 
        fr.readAsDataURL(file); 
	}

    function getRojo(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }

    function getVerde(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }

    function getAzul(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    function filtroimagen() {
		console.log(imageData);
        for (let y = 0; y < imageData.width; y++) {
            for (let x = 0; x < imageData.height; x++) {
                let rojo = getRojo(imageData, y, x);
                let verde = getVerde(imageData, y, x);
                let azul = getAzul(imageData, y, x);
                let gris = (rojo + verde + azul) / 3;
                setPixel(imageData, y, x, gris, gris, gris, 255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
        filtrobtn.style.display = 'none';
    }
