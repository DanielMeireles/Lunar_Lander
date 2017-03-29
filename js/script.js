function Sprite(){
  this.x = 0;
  this.y = 0;
  this.ax = 0;
  this.ay = 0;
  this.baseX=0;
  this.baseY=0;
  this.vx = 0;
  this.vy = 0;
  this.vidas = 0;
  this.color = "";

  this.mover = function(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }

  this.desenhar = function(ctx){
    if (pc.vidas>0){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, 10, 10);
    }else{
      ctx.fillStyle = "red";
      ctx.font = "3em Arial Black";
      var texto = "Game Over!";
      ctx.fillText(texto, 100, 160);
      ctx.fillStyle = "white";
      ctx.font = "1em Arial Black";
      var texto = "Tecle enter para reiniciar";
      ctx.fillText(texto, 150, 180);
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.baseY = 1000;
    }
    ctx.fillStyle = "yellow";
    ctx.font = "1em Arial Black";
  }


  this.desenharBase = function(ctx){
      if (tamanhoBase < 10){
        tamanhoBase = 10;
      }

      else if (this.baseX + tamanhoBase > eCanvas.width){
        this.baseX = eCanvas.width - tamanhoBase;
      }
      ctx.fillStyle = this.color;
      ctx.fillRect(this.baseX, this.baseY, tamanhoBase, 3); //(Posição de x, posição de y, largura, altura)
  }


  this.colidiuCom = function(alvo){
    if(this.y > eCanvas.height-13 && this.x > this.baseX && this.x < (this.baseX + tamanhoBase)) {
      if(this.vy < 100 && Math.abs(this.vx) < 10){
        this.vidas++;
        level++;
        this.x = eCanvas.width/2;
        this.y = 50;
        this.vx = 0;
        this.vy = 0;
        pc.baseX = Math.random()*eCanvas.width;
      }else{
        this.vidas--;
        this.x = eCanvas.width/2;
        this.y = 50;
        this.vy = 0;
        this.vx = 0;
      }
    }else if(this.x < 0 || this.y < 0 || this.x > eCanvas.width-10 || this.y > eCanvas.height-10){
        this.y=10;
        this.vy=0;
        this.x=eCanvas.width/2;
        this.vx=0;
        this.ax=0;
        this.ay=2;
        this.vidas--;
      }
    }
}
