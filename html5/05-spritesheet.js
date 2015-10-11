function Spritesheet(context, imagem, linhas, colunas) {
    this.context = context;
    this.imagem = imagem;
    this.numLinhas = linhas;
    this.numColunas = colunas;
    this.intervalo = 0;
    this.linha = 0;
    this.coluna = 0;
}


Spritesheet.prototype = {
    proximoQuadro: function () {

        var agora = new Date().getTime();

        if (!this.ultimoTempo)
            this.ultimoTempo = agora;

        if (agora - this.ultimoTempo < this.intervalo)
            return;

        if (this.coluna < this.numColunas - 1)
            this.coluna++;
        else
            this.coluna = 0;


        this.ultimoTempo = agora;
    },

    desenhar: function (x, y) {
        var larguraQuadro = this.imagem.width / this.numColunas;
        var alturaQuadro = this.imagem.height / this.numLinhas;

        var xClippingOffset = larguraQuadro * this.coluna;
        var yClippingOffset = alturaQuadro * this.linha;
        
        this.context.drawImage(this.imagem,
            xClippingOffset, yClippingOffset,
            larguraQuadro, alturaQuadro,
            x, y,
            larguraQuadro, alturaQuadro);

    }
}