"use strict";
var canvas = document.getElementById('canvas'),
	ctx = document.getElementById('canvas').getContext("2d"),
	board = new Board(),
	drag=false, 
	point = null, 
	begin=true,
	container = document.querySelector('#container'),
	color1 = document.querySelector('#color1'),
	color2 = document.querySelector('#color2'),
	name1 = document.querySelector('#name1'),
	name2 = document.querySelector('#name2'),
	time = document.querySelector('#time'),
	atributos =  document.querySelector('#atributos'),
	text =  document.querySelector('#spam'),
	buttonBegin = document.querySelector('#begin'),
	Winner = document.querySelector('#Winner');

function InitCanvas(){	
	ctx.fillStyle="#5D2971";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	ctx.fillStyle ="#3904E4";
	ctx.fillRect(150, 100, 500, 500); 
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(150,100);
	ctx.lineTo(650,100);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(150,100);
	ctx.lineTo(150,600);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(650,100);
	ctx.lineTo(650,600);
	ctx.stroke();
	if(begin){
		drawBoard();
		drawArrow();
		begin=false;
	}
	else{
		board.draw();
	}
	drawChips();
	
}
//dibuja el tablero
function drawBoard(){
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	board.load();
	board.draw();
}
//dibuja la fija de flechas q apuntan donde van las fichas
function drawArrow(){
		for(let y=150;y <= 650 ; y++){	
			point = new Ficha(y+25,70);
			point.setColor("#FF0000");
			board.addArrow(point);
			y=y+63;
		}
		board.draw();	
}
//dibuja las fichas en las esquinas q se pueden interactuar
function drawChips(){
		point = new Ficha(40,560);
		point.setColor(color1.value);
		point.setValor(1);
		board.setPlayerOne(point);
		board.setNamePone(name1.value);
		point = new Ficha(760,560);
		point.setColor(color2.value);
		point.setValor(2);
		board.setPlayerTwo(point);
		board.setNamePtwo(name2.value);
		board.draw();
}

// se fija si el puntero clickero una ficha valida y habilita el arrastrar
function Puntero(e){
	point = null;
	if (point == null)
	{
		point = board.detecClick(e.layerX,e.layerY);
	}
    if(point || null){
		drag=true;
    }
}
//arrastra la ficha elegida mientras se mantenga precionada
function arrastrar(e){
	if (drag){	
		if(point.getValor() || 0 ){
			if(point || null)
			{	
				board.playerRefesh(e.layerX,e.layerY);
				redraw();
			}
			else
			{
				board.playerRefesh(e.layerX,e.layerY);
				redraw();
			}
		}
	}
}
// analiza si las coordenadas donde largo la ficha son validas y pasa el turno, o te tira alerta si esta mal
function termine(e){
	let position = board.isCoordValid(point);
	if(drag){
		drag = false;
		e.preventDefault();
		if ((position || null) || (position == 0)) {
			board.drop(point, position);
			if(board.getPlayerNow()){
				text.innerHTML = 'Turno de '+ board.getNamePone();
			}else{
				text.innerHTML = 'Turno de '+ board.getNamePtwo();
			}
		} else {	
			alert("La posición no es válida, vuelva a intentar");
			drawChips();
			redraw();
		}
		point = null;
	}
}

function redraw(){
	board.draw();
}
//inicia el juego y desabilita para q no se vea las opciones al inicio y q se ves el contenedor
function beginGame(){
	atributos.style.display = 'none';
	buttonBegin.style.display = 'none';
	container.style.display = 'inline';
	text.style.display='inline';
	InitCanvas();
	text.innerHTML = 'Turno del Jugador '+ board.getNamePone();
	
}

function timeover(){
	if(atributos.style.display == 'none' ){
		console.log("tiempo"+time.value);
		alert("te quedaste sin tiempo, perdiste la jugada");
		window.clearInterval(time.value*100);
		
	}
}


canvas.addEventListener("mousemove",arrastrar);
canvas.addEventListener("mousedown",Puntero);
canvas.addEventListener("mouseup",termine);
buttonBegin.addEventListener("click",beginGame);
//window.setInterval(timeover, time.value*100);

