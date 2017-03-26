function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.g = 0;
  this.ax = 0;
  this.ay = 0;
  this.color = "";

  this.mover = function(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }

  this.desenhar = function(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 10, 10);
  }

  this.testaColisao = function(dt){
    if (this.x > 0 && this.x < 1000 && this.y < 600){
    }
    else{
      this.y=10;
      this.vy= 0;
      this.x=10;
      this.vx=0;
      this.ax=0;
      this.ay=0;
    }
  }

}
