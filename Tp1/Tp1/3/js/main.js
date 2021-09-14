let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let color ;
 

	function startup(e) {
        color = document.querySelector("#color");
        color.addEventListener("change", actualizarImageData, false);
    }

    function actualizarImageData() {
		color = color.value;
		let rgb = conversion(color);
		console.log(rgb);
        let width = 750;
        let height = 350;
        let imageData = ctx.createImageData(width, height);
        for (x = 100; x < width; x++) {
            for (y = 65; y < height; y++) {
                setPixel(imageData, x, y, rgb[0],rgb[1],rgb[2],255);
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

        function conversion(x) {
			console.log(x.substr(1,6));
            hexVal = x.substr(1,6);
            let red = hexVal.substr(0, 2),
                green = hexVal.substr(2, 2),
                blue = hexVal.substr(4, 2);

            let red10 = parseInt(red, 16),
                green10 = parseInt(green, 16),
                blue10 = parseInt(blue, 16);

            return [red10,green10,blue10];
			
        }
    }

let selectorcolor = document.getElementById("color");   
selectorcolor.addEventListener("click", startup, false);  
