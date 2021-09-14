let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let color;


    function startup(e) {
        color = document.querySelector("#color");
        color.value = document.querySelector("#color").value;
        color.addEventListener("change", actualizarFinal, false);
    }

    function actualizarFinal(event) {
        color = document.querySelector("#color").value;
        ctx.strokeStyle = "color";
        console.log(color);
        ctx.fillStyle = color;
        ctx.fillRect(200, 150, 400, 280);
    }

let selectorcolor = document.getElementById("color");   
selectorcolor.addEventListener("click", startup, false);    

