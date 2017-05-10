function Sprite(){
  this.g = 0;
  this.x = 0;
  this.y = 0;
  this.ax = 0;
  this.ay = 0;
  this.vx = 0;
  this.vy = 0;
  this.altura = 0;
  this.largura = 0;
  this.color = "";
  this.consumindo = false;
}

Sprite.prototype.mover = function(dt){
  this.vy = this.vy + (this.ay + this.g) * dt;
  this.vx = this.vx + (this.ax * dt);
  this.x = this.x + this.vx * dt;
  this.y = this.y + this.vy * dt;
}

Sprite.prototype.desenhar = function(ctx){
  if (vidas > 0 && verificador == 0){
    ctx.fillStyle = this.color;
    ctx.fillRect (this.x, this.y, this.largura, this.altura);
  }
}

function resetaValores(){
  pc.x = eCanvas.width/2;
  pc.y = 50;
  pc.vy = 0;
  pc.vx = 0;
}

function colidiuCom(){
  if(pc.y > eCanvas.height-pc.altura-plataforma.altura && pc.x > plataforma.x && pc.x < (plataforma.x + plataforma.largura - pc.largura)) {
    if(pc.vy < 30 && Math.abs(pc.vx) < 30){//Altera os valores aceitaveis para pouso
      vidas++;
      level++;
      plataforma.x = Math.random()*eCanvas.width;
      score = score + scoreLevel;
      resetaValores();
      verificador = 2;
    }else{
      vidas--;
      resetaValores();
      verificador = 1;
    }
  }else if(pc.x < 0 || pc.y < 0 || pc.x > eCanvas.width-pc.largura || pc.y > eCanvas.height-pc.largura){
      vidas--;
      resetaValores();
      verificador = 1;
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

function telas(){
  ctx.fillStyle = "white";
  ctx.font = "0.7em Arial Black";
  ctx.textAlign="left";
  ctx.fillText("Vidas: " + vidas, 10, 20);
  ctx.fillText("Level: " + level, 10, 35);
  ctx.textAlign="right";
  ctx.fillText("Score Level: " + scoreLevel.toFixed(), eCanvas.width - 10, 35);
  ctx.fillText("Score: " + score.toFixed(), eCanvas.width - 10, 20);
  if (vidas == 0){
    var texto1 = "Game over!";
    var texto2 = "Seu score foi " + score.toFixed() + " pontos";
    var texto3 = "Tecle enter para reiniciar";
    textoFormatado(texto1 ,texto2, texto3, "");
    resetaValores();
    scoreLevel = 0;
  }else if (verificador == 1){
    var texto1 = "Colidiu!";
    if (vidas > 1){
      var texto2 = "Você perdeu 1 vida ficando com " + vidas + " vidas";
      var texto3 = "Tecle enter para continuar";
      textoFormatado(texto1 ,texto2, texto3, "");
    }else{
      var texto2 = "Você perdeu 1 vida ficando com somente " + vidas + " vida";
      var texto3 = "Tecle enter para continuar";
      textoFormatado(texto1 ,texto2, texto3, "");
    }
    resetaValores();
    scoreLevel = 0;
  }else if (verificador == 2){
    var texto1 = "Parabéns!";
    var texto2 = "Você passou para o level " + level;
    var texto3 = "Você ganhou 1 vida ficando com " + vidas + " vidas";
    var texto4 = "Tecle enter para continuar";
    textoFormatado(texto1 ,texto2, texto3, texto4);
    resetaValores();
  }else if (verificador == 3){
    var texto1 = "Bem vindo";
    var texto2 = "Tecle enter para iniciar";
    textoFormatado(texto1 ,texto2, "", "");
    resetaValores();
  }
}

function atualizaValores(){
  if (verificador == 0 && scoreLevel >= 0){
    scoreLevel = scoreLevel - dt;//Calcula o Score do Level
  }
  if (combustivelTotal <= 0){
    pc.ax = 0;
    pc.ay = 0;
  }
  combustivel.largura = combustivelTotal;
  combustivel.color = "hsl("+combustivel.largura/eCanvas.width*120+",100%,50%)";
  if (plataforma.x + plataforma.largura > eCanvas.width){
    plataforma.x = eCanvas.width - plataforma.largura;
  }
  plataforma.largura = eCanvas.width/level;
  if (plataforma.largura < pc.largura){
    plataforma.largura = pc.largura;
  }
  if (pc.consumindo == true){
    combustivelTotal = combustivelTotal - dt*20;
  }
}

addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento){
  if (combustivelTotal > 0){
    switch (evento.keyCode){
      case 37:
          pc.ax = -10;
          pc.consumindo = true;
        evento.preventDefault();
        break;
      case 39:
          pc.ax = 10;
          pc.consumindo = true;
        evento.preventDefault();
        break;
      case 38:
          pc.ay = -30;
          pc.consumindo = true;
        evento.preventDefault();
        break;
        case 13:
          if (vidas == 0){
            vidas = 3;
            level = 1;
            plataforma.x = Math.random()*eCanvas.width;
            score = 0;
            scoreLevel = scoreInicial;
            combustivelTotal = eCanvas.width;
          }
          if (verificador == 1 || verificador == 2 || verificador == 3){
            verificador = 0;
            scoreLevel = scoreInicial;
            combustivelTotal = eCanvas.width;
          }
          evento.preventDefault();
          break;
      }
    }
}

addEventListener("keyup", teclaSolta);
function teclaSolta(evento){
  switch (evento.keyCode){
    case 37:
    case 39:
      pc.ax = 0;
      pc.consumindo = false;
      break;
    case 38:
      pc.ay = 0;
      pc.consumindo = false;
      break;
  }
}
