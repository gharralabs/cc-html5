function Nave(context, teclado, imagem, imgExplosao ) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;

    this.spritesheet = new Spritesheet(context, imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;

    this.imgExplosao = imgExplosao;

    this.aoAcabarAsVidas = null;
    this.vidas = 3;
}

Nave.prototype = {
    atualizar: function () {

        var incremento = this.velocidade * this.animacao.decorrido / 1000;

        if( this.teclado.pressionada(SETA_ESQUERDA) && 
            this.x > 0) {
            this.x -= incremento;
        }

        if(this.teclado.pressionada(SETA_DIREITA) &&
            this.x + 36 < this.context.canvas.width) {
            this.x += incremento;
        }

        if(this.teclado.pressionada(SETA_ACIMA) && 
            this.y > 0) {
            this.y -= incremento;
        }

        if(this.teclado.pressionada(SETA_ABAIXO) && 
            this.y + 48 < this.context.canvas.height) {
            this.y += incremento;
        }


    },

    desenhar: function () {

        if (this.teclado.pressionada(SETA_ESQUERDA))
            this.spritesheet.linha = 1;
        else if(this.teclado.pressionada(SETA_DIREITA))
            this.spritesheet.linha = 2;
        else
            this.spritesheet.linha = 0;

        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    },

    atirar: function () {
        var t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },

    retangulosColisao : function(){


        var rets =
            [
                { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
                { x: this.x + 13, y: this.y + 3, largura: 10, altura: 33 },
                { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 }
            ];


        return rets;
    },

    colidiuCom: function (outro) {

        if (outro instanceof Ovni) {

            this.animacao.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(outro);

            var exp1 = new Explosao(this.context, this.imgExplosao,
                this.x, this.y);

            var nave = this;

            exp1.fimExplosao = function () {
                nave.vidas--;

                if (nave.vidas < 0) {

                    if (nave.aoAcabarAsVidas)
                        nave.aoAcabarAsVidas();

                }
                else {
                    nave.colisor.novoSprite(nave);
                    nave.animacao.novoSprite(nave);
                }
            }

            var exp2 = new Explosao(this.context, this.imgExplosao,
                outro.x, outro.y);

            this.animacao.novoSprite(exp1);
            this.animacao.novoSprite(exp2);

        }

    },

    posicionar: function () {
        var canvas = this.context.canvas;
        this.x = canvas.width * 0.5 - 18;
        this.y = canvas.height * 0.5 - 48;

    }


}