class personaje  extends GameObject
{
  constructor (context, x, y, vx, vy){
      super(context, x, y, vx, vy);
      this.img = new Image();
      this.img.src = "./imagenes/pajaro1.png";
      this.height = 0;
      this.width = 0;
      this.saltando = false;
      this.sec = 0;
      this.marcar=false;
      this.bajando = false;
      this.vidas = 3;
      this.ciclo = 0;
      this.expl = false;
  }

  draw(){

    this.height = this.img.height;
    this.width = this.img.width;
      this.context.drawImage(this.img, this.x, this.y);
  }
    update(secondsPassed){
        //Move with set velocity
        this.ciclo += secondsPassed;
        if (!this.expl){
        if (this.ciclo < 0.1)
        {
                this.img.src = "./imagenes/pajaro1.png";
        }
        else{
        if (this.ciclo < 0.2)
        {
                this.img.src = "./imagenes/pajaro2.png";
        }else{
        if (this.ciclo < 0.3)
        {
                this.img.src = "./imagenes/pajaro3.png";
        }
        else {
          this.ciclo = 0;
        }}}}
        else {
          if (this.ciclo < 0.1)
          {
                  this.img.src = "./imagenes/colision1.png";
          }
          else{
          if (this.ciclo < 0.2)
          {
                  this.img.src = "./imagenes/colision2.png";
          }else{
          if (this.ciclo < 0.3)
          {
                  this.img.src = "./imagenes/colision3.png";
          }
          if (this.ciclo < 0.4)
          {
                  this.img.src = "./imagenes/colision4.png";
          }
          else{
          if (this.ciclo < 0.5)
          {
                  this.img.src = "./imagenes/colision5.png";
          }else{
          if (this.ciclo < 0.6)
          {
                  this.img.src = "./imagenes/colision6.png";
          }
          if (this.ciclo < 0.7)
          {
                  this.img.src = "./imagenes/colision7.png";
          }
          else{
          if (this.ciclo < 0.8)
          {
                  this.img.src = "./imagenes/colision8.png";
          }
          else{if (this.ciclo < 0.9)
          {
                  this.img.src = "./imagenes/colision1.png";
          }
          else {
            this.expl=false;
            this.ciclo = 0;
          }}}}}}}}
        if (this.saltando)
        {
          this.sec += secondsPassed;
        }
        if (this.bajando)
        {
          this.sec -= secondsPassed;
        }
        if (this.sec > 0.5)
        {
          this.bajar();
        }
        if (this.sec < 0)
        {
          this.bajando = false;
          this.saltando = false;
        }
        if (this.saltando)
        {
          this.vy = -1000+this.sec*2000;
        }
        else{
        if (this.bajando)
        {
          this.vy = 1000-this.sec*2000;
        }
        else{
          this.vy=0;
        }
        }
        this.y += this.vy * secondsPassed;
        if (this.vy ==0)
        {
          this.y = 450;
        }
    }
    colision(e){
    }
    explotar(){
      this.expl = true;
      this.ciclo = 0;
      this.vidas = this.vidas - 1;
      if(this.vidas>0){
      document.getElementById('vidas').innerHTML = 'Usted Tiene '+this.vidas+' vidas';
    }else{
      this.endgame();
    }
    }
    comer(){
        this.vidas = this.vidas + 1;
        document.getElementById('vidas').innerHTML = 'Usted Tiene '+this.vidas+' vidas';
    }
    endgame(){
      document.getElementsByClassName('container').hidden;
    }
    saltar(){
      if (!this.saltando &&!this.bajando){
      this.saltando = true;
      this.bajando = false;}
    }
    bajar(){
      this.saltando = false;
      this.bajando = true;
    }
}
