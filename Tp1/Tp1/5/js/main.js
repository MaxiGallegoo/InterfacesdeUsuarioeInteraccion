var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
let imageData = ctx.createImageData(width, height);
let color = 0;
let blanco = 0;
let r = 0;
let b = 0;
let g = 0;
    
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            color = y / width * 255;
            setPixel(imageData, x, y, r, g, b, 255);
        }
        if (x < width / 2) {
            r += 1;
            g += 1;
            b -= 1;
            color = 0;
        } else {
            r += 1;
            b -= 1;
            g -= 1;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    function setPixel(imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
