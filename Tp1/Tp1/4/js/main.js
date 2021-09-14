let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let imageData = ctx.createImageData(width, height);
let color = 0;
let trasparencia = 255;
    
    for (x = 0; x < width; x++){
        for (y = 0; y < height; y++){
            color = y / height * 255;
            setPixel(imageData, x, y, color, color, color, trasparencia);
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

