let limpiarfondo = false; 
let lapiz = document.getElementById('lapiz'),
    goma = document.getElementById('goma'),
    atributos = document.getElementById('atributos'),
    cursor = document.getElementById("cursor"),
    isDrawing = false,
    comenzar = false,
    lastX = 0,
    lastY = 0;
ctx.lineWidth = 30;


function UsarLapiz(){
    limpiarfondo=false;
    atributos.style.display = 'inline';
    comenzar=true;
}

function UsarGoma(){
    limpiarfondo=true;
    comenzar=true;
}


function dibujar(e) {
    if (!comenzar) return;
    if (!isDrawing) return;
    if(limpiarfondo){
        ctx.strokeStyle="#FFFFFF";       
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.lineWidth = document.querySelector('#customRange').value;
    ctx.strokeStyle = document.querySelector('#color').value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', dibujar);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
lapiz.addEventListener("click",UsarLapiz);
goma.addEventListener("click",UsarGoma);
cursor.addEventListener('click',function(){
    comenzar=false;
    atributos.style.display = 'none';
});
