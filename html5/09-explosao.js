function Explosao(context, imagem, x, y) {

    this.context = context;
    this.imagem = imagem;
    this.spritesheet = new Spritesheet(context, imagem, 1, 5);
    this.spritesheet.intervalo = 75;
    this.x = x;
    this.y = y;


    var explosao = this;
    this.fimExplosao = null;
    this.spritesheet.fimCiclo = function () {
        explosao.animacao.excluirSprite(explosao);
        if (explosao.fimExplosao)
            explosao.fimExplosao();
    }
}


Explosao.prototype = {
    atualizar: function () {

    },

    desenhar: function () {
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }
};