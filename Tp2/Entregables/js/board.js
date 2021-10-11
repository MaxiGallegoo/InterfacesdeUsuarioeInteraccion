
class Board {
	constructor() {
		this.matrix = [
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		];
		this.arrayArrow = [];
		this.playerOne;
		this.playerTwo;
		this.playerName1;
		this.playerName2;
		this.MaxSize = 8;
		this.currentX=0;
		this.currentY=0;
		this.playerNow=true;
		this.chipQuantity=0;
	}
	setPlayerOne(chip) {
		this.playerOne = chip; 
	}
	setPlayerTwo(chip) {
		this.playerTwo = chip; 
	}
	setPoneX(x){
		this.playerOne.setX(x);
	}

	setPoneY(y) {
		this.playerOne.setY(y);
	}

	setPtwoX(x){
		this.playerTwo.setX(x);
	}

	setPtwoY(y) {
		this.playerTwo.setY(y);
	}
	getNamePone(name){
		return this.playerName1;
	}
	getNamePtwo(name){
		return this.playerName2;
	}
	setNamePone(name){
		this.playerName1=name;
	}
	setNamePtwo(name){
		this.playerName2=name;
	}
	getPlayerNow(){
		return this.playerNow;
	}
	load(){
		var tamanoFicha=62;
		var tamanoIntermedio=31;
		var valorMaxX=650;
		var valorMaxY=600;
		for(let x=150;x <valorMaxX; x++){
			this.currentY = 0;	
			for(let y=100;y <valorMaxY ; y++){	
				if (this.currentX < this.MaxSize){
					if (this.currentY < this.MaxSize) {
						point = new Ficha(x+tamanoIntermedio,y+tamanoIntermedio);
						this.matrix[this.currentX].push(point);
					}
				}
				this.currentY++;
				y=y+tamanoFicha-1;
			}
			this.currentX++;	
			x=x+tamanoFicha-1;
		}
	}
	
	addArrow(arrow){
	this.arrayArrow.push(arrow);
	}

	draw(){
		this.cleanCanvas();
		for (let i=0; i<this.arrayArrow.length; i++){
			this.arrayArrow[i].draw();
		}
		for(let i=0;i<this.matrix.length;i++)
		{
			for(let y=0;y<this.matrix.length;y++){
				this.matrix[i][y].draw();
			}
		}
		if (this.playerOne !== undefined && this.playerTwo !== undefined) {
			this.playerOne.draw();
			this.playerTwo.draw();
		}
	}

	cleanCanvas(){
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
		ctx.font = "bold 12px sans-serif";
		ctx.fillStyle="#000000";
		ctx.fillText("Seleccionar fila a ingresar",2,75);
		ctx.font = "bold 20px sans-serif";
		ctx.fillText("--->",75,95);
	}

	detecClick(x,y){
		if(this.playerNow){
			if(this.playerOne.onTap(x,y)){
					return this.playerOne;
				}		
		}else{
			if(this.playerTwo.onTap(x,y)){
					return this.playerTwo;
			}
		}
		return null;
	}

	playerRefesh(X,Y){
		if(this.playerNow){
			this.setPoneX(X);
			this.setPoneY(Y);
		}else{
			this.setPtwoX(X);
			this.setPtwoY(Y);
		}
	}

	isCoordValid(chip) {
		if(chip || null){
			for(var i = 0;i<this.arrayArrow.length;i++){
				if(chip.onTap(this.arrayArrow[i].getX(),this.arrayArrow[i].getY())){
					return i;
				}
			}
		}
		return null;
	}

	drop(chip, position){
		let chipNow = chip,
		    xAux=0,
			yAux=0;	
		for(var i = this.matrix.length-1 ; i>=0 ;i--){
			if(this.matrix[position][i].getValor() == 0){
				this.matrix[position][i].setValor(chipNow.getValor());
				this.matrix[position][i].setColor(chipNow.getColor());
				drawChips();
				this.draw();
				this.finish(position,i);
				if(this.playerNow){
					this.playerNow=false;
				}else{
					this.playerNow=true;
				}
				return;
			}
		}
		return;
	}
	finish(columna,fila){
		let jugador;
		jugador = this.win(columna,fila);
		if(jugador || null){
				if(this.playerNow){
					document.querySelector('#TextWinner').innerHTML = 'Felicitaciones Ganador = '+ board.getNamePone();
				}else{
					document.querySelector('#TextWinner').innerHTML = 'Felicitaciones Ganador = '+ board.getNamePtwo();
				}
				Winner.click();
		}
		return false;
	}
	win(x,y){
		if(this.porDer(x,y) || null){
			return this.porDer(x,y);
		}else{
			if(this.porIzq(x,y) || null){
				return this.porIzq(x,y);
			}
			else{
				if(this.porAbajo(x,y) || null){
					return this.porAbajo(x,y);
				}
				else{
					if(this.porDerInf(x,y) || null){
							return this.porDerInf(x,y);
					}else{
						if(this.porDerSup(x,y) || null){
							return this.porDerSup(x,y);
						}else{
							if(this.porIzqInf(x,y) || null){
									return this.porIzqInf(x,y);
							}else{
								if(this.porIzqSup(x,y) || null){
									return this.porIzqSup(x,y);
								}
							}
						}
					}	
				}	
			}	
		}				
		return null;
	}
	porDer(x,y){
		let aux=0;
		for(let i=x; i < this.matrix.length;i++){
			if((i+1 < this.matrix.length)&&(this.matrix[i][y].getValor()>0)&&(this.matrix[i][y].getValor() == this.matrix[i+1][y].getValor())){							
				aux++;
			}
			else{
				aux=0;
			}
			if(aux == 3){
				console.log("Ganaste Por Derecha");
				return this.matrix[i][y].getValor();
			}
		}
		return null;
	}
	porIzq(x,y){
		let aux=0;
		for(let i=x ; i >= 0 ; i--){
			if((i > 0)&&(this.matrix[i][y].getValor()>0)&&(this.matrix[i][y].getValor() == this.matrix[i-1][y].getValor())){							
				aux++;
			}
			else{
				aux=0;
			}
			if(aux == 3){
				console.log("Ganaste por izquierda");
				return this.matrix[i][y].getValor();
			}
		}
		return null;
	}		
	porAbajo(x,y){
		let aux=0;
		for(let i=y ; i<= this.matrix.length ;i++){
			if((i+1<this.matrix.length)&&(this.matrix[x][i].getValor()>0)&&(this.matrix[x][i].getValor() == this.matrix[x][i+1].getValor())){							
				aux++;
			}
			else{
				aux=0;
			}
			if(aux == 3){
				console.log("Ganaste por Abajo");
				return this.matrix[x][i].getValor();
			}
		}
		return null;
	}
	
	porDerSup(x,y){
		let aux=0,
			i=x,
			j=y;
				while( (i+1 < this.matrix.length) && (j > 0) ) {
					if((this.matrix [i][j].getValor()>0)&&(this.matrix[i][j].getValor() == this.matrix[i+1][j-1].getValor())){							
						aux++;
					}
					else{
						aux=0;
					}
					if(aux == 3){
						console.log("Ganaste Por DerechaSuperior");
						return this.matrix[i][j].getValor();
					}
					i++;
					j--;				
				}
		return null;
	}
	porIzqInf(x,y){
		let aux=0,
			i=x,
			j=y;
				while( (j+1 < this.matrix.length) && (i > 0) ) {
					if((this.matrix[i][j].getValor()>0)&&(this.matrix[i][j].getValor() == this.matrix[i-1][j+1].getValor())){							
						aux++;
					}
					else{
						aux=0;
					}
					if(aux == 3){
						console.log("Ganaste Por IzquierdaInferior");
						return this.matrix[i][j].getValor();
					}
					i--;
					j++;				
				}
		return null;
	}
	porIzqSup(x,y){
		let aux=0,
			i=x,
			j=y;
				while( (i>0) && (j>0) ){
					if((this.matrix[i][j].getValor()>0)&&(this.matrix[i][j].getValor() == this.matrix[i-1][j-1].getValor())){							
						aux++;
					}
					else{
						aux=0;
					}
					if(aux == 3){
						console.log("Ganaste Por IzquierdaSuperior");
						return this.matrix[i][j].getValor();
					}
					i--;
					j--;				
				}
		return null;
	}
	porDerInf(x,y){
		let aux=0,
			i=x,
			j=y;
			while( (i+1 < this.matrix.length) && (j+1 < this.matrix.length) ){
				if((this.matrix[i][j].getValor()>0)&&(this.matrix[i][j].getValor() == this.matrix[i+1][j+1].getValor())){							
					aux++;
				}
				else{
					aux=0;
				}
				if(aux == 3){
					console.log("Ganaste Por DerechaSuperior");
					return this.matrix[i][j].getValor();
				}
				i++;
				j++;				
			}
	return null;
	}
}
