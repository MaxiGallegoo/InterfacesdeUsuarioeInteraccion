class GameWorld {

    constructor(canvasId){
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.resetCounter = 0;
        this.init(canvasId);
        window.addEventListener("keypress",this);

    }
    keyPressEvent(e)
    {
        if (e.code == "KeyW")
        {
          console.log("saltar");
          this.gameObjects[0].saltar();
        }
    }
    handleEvent(e){
            this.keyPressEvent(e);
    }
    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.createWorld();
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    createWorld() {
        this.gameObjects = [
            new personaje(this.context, 50, 450, 0, 0),
          ];
          this.crearCajas();
    }
    crearCajas() {
      var that = this;
      setInterval(function () {
      that.nuevoItem();
      }, 2000);
    }
    crearCookie() {
      var that = this;
      setInterval(function () {
      that.nuevaCookie();
      }, 2000);
    }
    gameLoop(timeStamp) {

        var secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(secondsPassed);
        }
        this.detectCollisions();
        this.clearCanvas();
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }

    detectCollisions() {
        var obj1;
        var obj2;

        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }

        for (var i = 0; i < this.gameObjects.length; i++)
        {
            obj1 = this.gameObjects[i];
            for (var j = i + 1; j < this.gameObjects.length; j++)
            {
                obj2 = this.gameObjects[j];
                if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                    obj1.colision(obj2);
                    obj2.colision(obj1);
                }
            }
            for (var i = 0; i < this.gameObjects.length; i++) {
                if (this.gameObjects[i].borrar)
                {
                   this.gameObjects.splice(i,1);
                }
            }
        }
    }
    nuevoItem(){
      let a = Math.random();
      if (a<0.5)
      {
      let box = new Box(this.context, 1500, 400, -(Math.random()*300+200), 0);
      let coin = new Coin(this.context, 1500, 500, -(Math.random()*300+200), 0);
      this.gameObjects.push(box);
      this.gameObjects.push(coin);
      }
        else
        {
          let box = new Box(this.context, 1500, 300, -(Math.random()*300+200), 0);
          let coin = new Coin(this.context, 1500, 200, -(Math.random()*300+200), 0);
            this.gameObjects.push(box);
            this.gameObjects.push(coin);
          }
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }
        return true;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
