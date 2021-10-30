class Box  extends GameObject
{
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);
        this.img = new Image();
        this.img.src = "./imagenes/box.png";
        this.height= 0;
        this.width = 0;
    }

    draw(){
      this.height = this.img.height;
      this.width = this.img.width;
        this.context.drawImage(this.img, this.x, this.y);
    }

    update(secondsPassed){
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
    colision(e){
          e.explotar();
          this.borrar = true;
    }
}
