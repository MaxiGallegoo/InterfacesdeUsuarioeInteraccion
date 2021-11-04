var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.fillStyle="#FFFF00";
ctx.closePath();
var width = canvas.width;   //cambian con las imagenes
var height = canvas.height; //idem arriba
var ImagenActual;
let imageData;
let imageAspectRadio;
let imageAspectWidth;
let imageAspectHeight;
var maxWidth = 800; // Max width for the image
var maxHeight = 800;    // Max height for the image
var ratio = 0;  // Used for aspect ratio
//botones

//filtros
    let filtrobtn0 = document.querySelector('#binarizacion'),
        filtrobtn1 = document.querySelector('#brillo'),
        filtrobtn2 = document.querySelector('#negativo'),
        filtrobtn3 = document.querySelector('#sepia'),
        filtrobtn4 = document.querySelector('#contraste'),
        filtrobtn5 = document.querySelector('#filtroSuavizado'),
        filtrobtn6 = document.querySelector('#Saturacion');

    //acciones
         let descargar = document.querySelector('#descargar');
           

//Eventos despues de tocar botones
    document.querySelector('.ifile').addEventListener("change",cargarImagen);
    descargar.addEventListener('click',descargarImagen);

filtrobtn0.addEventListener('click', filtroBinarizacion);
filtrobtn1.addEventListener('click', filtroBrillo);
filtrobtn2.addEventListener('click', filtroNegativo);
filtrobtn3.addEventListener('click', filtroSepia);
filtrobtn4.addEventListener('click', filtroContraste);
filtrobtn5.addEventListener('click', filtroSuavizado);
filtrobtn6.addEventListener('click',filtroSaturation);

//Funciones
    function cargarImagen(event){
        let file = event.target.files[0];
        let fr = new FileReader();
        fr.onload = function(){ 
                let img = new Image();
                img.onload = function(){ 
                    width = img.width;
                    height = img.height; 
                    if (width > maxWidth && width > height) {            
                        ratio = width / height;
                        imageAspectHeight = maxWidth/ratio;
                        imageAspectWidth = maxWidth; 
                
                    }else  if (height > maxHeight && height > width){
                        
                        ratio = height / width;
                        imageAspectWidth = maxHeight/ratio;
                        imageAspectHeight = maxHeight;
                    }else {
                
                        imageAspectWidth = maxWidth;
                        imageAspectHeight = maxHeight;
                    }
                canvas.width = imageAspectWidth;
                canvas.height = imageAspectHeight;
                ctx.drawImage(img,0,0,imageAspectWidth,imageAspectHeight);         
                imageData = ctx.getImageData(0, 0, imageAspectWidth, imageAspectHeight);
                }
                img.src = fr.result;
            }; 
        fr.readAsDataURL(file);
        ImagenActual= imageData;
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
    
    function getImgData() {
        return ctx.getImageData( 0, 0, canvas.width, canvas.height );
    }

    function filtroBinarizacion(){
        let imageData=getImgData();
        for (y=0;y<canvas.height;y++){
            for (x=0;x<canvas.width;x++){
                index=(x+y*imageData.width)*4;
                let promedio=(imageData.data[index+0]+imageData.data[index+1]+imageData.data[index+2])/3;
                    imageData.data[index+0]=promedio;
                    imageData.data[index+1]=promedio;
                    imageData.data[index+2]=promedio;
            }
        }
            ctx.putImageData(imageData,0,0);
    }
    
    function filtroBrillo(){
        let K =  document.querySelector("#cantBrillo").value,
            imgData = getImgData(),
            pixels = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
            pixels[i] = rangeColor(pixels[i] + K);
            pixels[i + 1] = rangeColor(pixels[i + 1] + K);
            pixels[i + 2] = rangeColor(pixels[i + 2] + K);
        }
        ctx.putImageData(imgData, 0, 0);
    }

    function rangeColor(pix) {
        if (pix < 0)
            pix = 0;
        if (pix > 255)
            pix = 255;
        return pix;
    }
    function filtroNegativo(){
            let  imageData = getImgData(),
                pixels = imageData.data,
                numPixels = imageData.width * imageData.height;
         
            for ( let i = 0; i < numPixels; i++ ) {
                let r = pixels[ i * 4 ];
                let g = pixels[ i * 4 + 1 ];
                let b = pixels[ i * 4 + 2 ];
         
                pixels[ i * 4 ] = 255 - r;
                pixels[ i * 4 + 1 ] = 255 - g;
                pixels[ i * 4 + 2 ] = 255 - b;
            }
         
            ctx.putImageData( imageData, 0, 0 );
    }
    
    function filtroSepia(){
        let imageData = getImgData(),
            pixels = imageData.data;
        for ( var i = 0; i < pixels.length; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];
     
            pixels[ i * 4 ] = 255 - r;
            pixels[ i * 4 + 1 ] = 255 - g;
            pixels[ i * 4 + 2 ] = 255 - b;
     
            pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
            pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
            pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
        }
     
        ctx.putImageData( imageData, 0, 0 );
    }
    function filtroSaturation(){
        let imageData=getImgData();
        let cantSat =  document.querySelector("#cantSaturacion").value*1.0+0.01;
         for (y=0;y<canvas.height;y++){
            for (x=0;x<canvas.width;x++){
                index=(x+y*imageData.width)*4;
                let HSL=rgbToHsl(imageData.data[index+0],imageData.data[index+1],imageData.data[index+2]);
                HSL[1]=cantSat;
                let RGB=hslToRgb(HSL[0],HSL[1],HSL[2]);
                imageData.data[index+0]= RGB[0];
                imageData.data[index+1]= RGB[1];
                imageData.data[index+2]= RGB[2];
            }
         }
        ctx.putImageData(imageData,0,0);
    }
    
    function rgbToHsl(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if(max == min){
            h = s = 0; 
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }
    function hslToRgb(h, s, l){
        var r, g, b;
        if(s == 0){
            r = g = b = l; 
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
    
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    function filtroSuavizado(){
            kernel=[[1,1,1],[1,1,1],[1,1,1]]
            let imageData=getImgData();
            let pixels=ctx.getImageData(0,0,canvas.width,canvas.height); 
            for (y=0;y<canvas.height;y++){
                for (x=0;x<canvas.width;x++){
                    index=(x+y*imageData.width)*4;
                    let vecinos=getVecinos(imageData,x,y);
                    let R=0,G=0,B=0;
                    for (let i = 0; i <=2; i++) {
                        for (let j = 0; j <=2; j++) {
                            R+=vecinos[i][j].data[0]*kernel[i][j];
                            G+=vecinos[i][j].data[1]*kernel[i][j];
                            B+=vecinos[i][j].data[2]*kernel[i][j];
                        }
                    }
                    pixels.data[index]=(R/(9))
                    pixels.data[index+1]=(G/9);
                    pixels.data[index+2]=(B/9);
                }
            }
            ctx.putImageData(pixels,0,0);
    }  
    function getVecinos(imageDate,x,y){
        let array=new Array(3);
        for (let a = 0; a < array.length; a++)
        array[a]=new Array(3);
        let pixel;
        let fueradevalores={data:[0,0,0]};
        let index=(x+y*imageDate.width)*4;
        for (let i = -1; i <=1; i++) {
            for (let j = -1; j <=1; j++) {
                let newIndex=((x+i)+(y+j)*canvas.width)*4;
                if (x+i>=0 && y+j>=0 && x+i<=imageDate.width && y+j<=imageDate.height)
                    pixel={data:[imageDate.data[newIndex+0],imageDate.data[newIndex+1],imageDate.data[newIndex+2]]};
                else pixel=fueradevalores;
                array[i+1][j+1]=pixel;
            }
        }
        return array;
    }
        
    function filtroContraste(){     
        let k = document.querySelector("#cantContraste").value;
            contrast = Math.tan(k * Math.PI / 180.0),
		    imageData = getImgData(),
            pixels = imageData.data;         
		for (var i = 0, n = pixels.length; i < n; i += 4) {
			pixels[i] = rangeColor(128 + (pixels[i] - 128) * contrast);
			pixels[i + 1] = rangeColor(128 + (pixels[i + 1] - 128) * contrast);
			pixels[i + 2] = rangeColor(128 + (pixels[i + 2] - 128) * contrast);
		}
		ctx.putImageData(imageData, 0, 0);
    }   

   function descargarImagen(){
            let filename = prompt("Guardar como",""),
            link = document.createElement('a');
            if (filename == null){
                return false;
            }
            else if (filename == ""){           
                link.download = "Sin título";
                link.href = canvas.toDataURL("image/png");      
            }
            else{           
                link.download = filename;
                link.href = canvas.toDataURL("image/png");
            }
            link.click();
        }