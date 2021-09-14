let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let imageData = ctx.createImageData(width, height);
let r = 0;
let b = 50;
let g = 200;
//rgba(136, 45, 96, 1) violeta
//rgba(170, 59, 56, 1) rojo
//rgba(170, 108, 56, 1) amalrillo
    
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {           
            setPixel(imageData, x, y, r, g, b, 255);
        }
        if (x < width / 3) {
            r += 1;
            g += 1;
            b -= 1;
            
        } else {
            r += 1;
            b -= 1;
            g -= 1;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    function setPixel(imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 1] = r;
        imageData.data[index + 2] = g;
        imageData.data[index + 0] = b;
        imageData.data[index + 3] = a;
    }
