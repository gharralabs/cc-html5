function Colisor() {
    this.sprites = [];
}

Colisor.prototype = {

    novoSprite: function (sprite) {
        this.sprites.push(sprite);
    },

    processar: function () {
        for( var i in this.sprites ){
            for (var j in this.sprites) {

                if (i == j)
                    continue;

                this.testarColisao(this.sprites[i], this.sprites[j]);
            }
        }
    },

    testarColisao: function (sprite1, sprite2) {

        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();

        for (var i in rets1) {
            for (var j in rets2) {
                if (this.retangulosColidem(rets1[i], rets2[j])) {
                    sprite1.colidiuCom(sprite2);
                    sprite2.colidiuCom(sprite1);
                    break;
                }
            }
        }
    },

    retangulosColidem: function (ret1, ret2) {

        return (ret1.x + ret1.largura) > ret2.x && 
                ret1.x < ( ret2.x + ret2.largura) && 
               (ret1.y + ret1.altura) > ret2.y &&
                ret1.y < ( ret2.y + ret2.altura);
    }


}