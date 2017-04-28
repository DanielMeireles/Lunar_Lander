function Sprite(){
  this.verificador = 0;//Se 0 está em jogo / Se 1 perdeu vida / Se 2 passou de nivel e ganhou 1 vida / Se 3 não foi iniciado
  this.score = 0;
  this.scoreLevel = 0;
  this.g = 0;
  this.x = 0;
  this.y = 0;
  this.ax = 0;
  this.ay = 0;
  this.vx = 0;
  this.vy = 0;
  this.altura = 0;
  this.largura = 0;
  this.vidas = 0;
  this.color = "";
  this.mover = function(dt){
    this.vy = this.vy + (this.ay + this.g) * dt;
    this.vx = this.vx + (this.ax * dt);
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
  }
  this.desenhar = function(ctx){
    if (this.vidas > 0 && this.verificador == 0){
      ctx.fillStyle = this.color;
      ctx.fillRect (this.x, this.y, this.largura, this.altura);
      level.desenharBase();
      this.scoreLevel = this.scoreLevel - dt;//Calcula o Score do Level
    }else if (this.vidas == 0){
      var texto1 = "Game over!";
      var texto2 = "Seu score foi " + this.score.toFixed() + " pontos";
      var texto3 = "Tecle enter para reiniciar";
      textoFormatado(texto1 ,texto2, texto3, "");
      resetaValores();
      this.scoreLevel = 0;
    }else if (this.verificador == 1){
      var texto1 = "Colidiu!";
      if (pc.vidas > 1){
        var texto2 = "Você perdeu 1 vida ficando com " + pc.vidas + " vidas";
        var texto3 = "Tecle enter para continuar";
        textoFormatado(texto1 ,texto2, texto3, "");
      }else{
        var texto2 = "Você perdeu 1 vida ficando com somente " + pc.vidas + " vida";
        var texto3 = "Tecle enter para continuar";
        textoFormatado(texto1 ,texto2, texto3, "");
      }
      resetaValores();
      this.scoreLevel = 0;
    }else if (this.verificador == 2){
      var texto1 = "Parabéns!";
      var texto2 = "Você passou para o level " + level.level;
      var texto3 = "Você ganhou 1 vida ficando com " + pc.vidas + " vidas";
      var texto4 = "Tecle enter para continuar";
      textoFormatado(texto1 ,texto2, texto3, texto4);
      resetaValores();
    }else if (this.verificador == 3){
      var texto1 = "Bem vindo";
      var texto2 = "Tecle enter para iniciar";
      textoFormatado(texto1 ,texto2, "", "");
      resetaValores();
    }
  }
}
function Level(){
  this.tamanhoBaseInicial = 0;
  this.tamanhoBase = 0;
  this.level = 1;
  this.baseX = 0;
  this.baseY = 0;
  this.desenharBase = function(){
    this.tamanhoBase = this.tamanhoBaseInicial / (this.level*0.5);
    if (this.tamanhoBase < pc.largura){
      this.tamanhoBase = pc.largura;
    }
    else if (this.baseX + this.tamanhoBase > eCanvas.width){
      this.baseX = eCanvas.width - this.tamanhoBase;
    }
    ctx.fillStyle = "gold";
    ctx.fillRect(this.baseX, this.baseY, this.tamanhoBase, 3);
  }
}
function colidiuCom(){
  if(pc.y > eCanvas.height-13 && pc.x > level.baseX && pc.x < (level.baseX + level.tamanhoBase - pc.largura)) {
    if(pc.vy < 30 && Math.abs(pc.vx) < 30){//Altera os valores aceitaveis para pouso
      pc.vidas++;
      level.level++;
      level.baseX = Math.random()*eCanvas.width;
      pc.score = pc.score + pc.scoreLevel;
      resetaValores();
      pc.verificador=2;
    }else{
      pc.vidas--;
      resetaValores();
      pc.verificador = 1;
    }
  }else if(pc.x < 0 || pc.y < 0 || pc.x > eCanvas.width-pc.largura || pc.y > eCanvas.height-pc.largura){
      pc.vidas--;
      resetaValores();
      pc.verificador = 1;
    }
  }
function resetaValores(){
  pc.x = eCanvas.width/2;
  pc.y = 50;
  pc.vy = 0;
  pc.vx = 0;
}
function teclaPressionada(evento){
  switch (evento.keyCode){
    case 37:
      pc.ax = -10;
      evento.preventDefault();
      break;
    case 39:
      pc.ax = 10;
      evento.preventDefault();
      break;
    case 38:
      pc.ay = -32;
      evento.preventDefault();
      break;
      case 13:
        if (pc.vidas == 0){
          ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);
          pc.vidas = 3;
          level.level = 1;
          level.baseX = Math.random()*eCanvas.width;
          pc.score = 0;
          pc.scoreLevel = pc.scoreInicial;
        }
        if (pc.verificador == 1 || pc.verificador == 2 || pc.verificador == 3){
          ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);
          pc.verificador = 0;
          pc.scoreLevel = pc.scoreInicial;
        }
        evento.preventDefault();
        break;
    }
}
function teclaSolta(evento){
  switch (evento.keyCode){
    case 37:
    case 39:
      pc.ax = 0;
      break;
    case 38:
      pc.ay = 0;
      break;
  }
}
function textoFormatado(texto1, texto2, texto3, texto4){
  ctx.textAlign="center";
  ctx.fillStyle = "red";
  ctx.font = "3em Arial Black";
  ctx.fillText(texto1, eCanvas.width / 2, eCanvas.height / 2);
  ctx.fillStyle = "white";
  ctx.font = "1em Arial Black";
  ctx.fillText(texto2, eCanvas.width / 2, eCanvas.height / 2 + 20);
  ctx.fillText(texto3, eCanvas.width / 2, eCanvas.height / 2 + 40);
  ctx.fillText(texto4, eCanvas.width / 2, eCanvas.height / 2 + 60);
}
