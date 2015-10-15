var SETA_ESQUERDA = 37;
var SETA_ACIMA = 38;
var SETA_DIREITA = 39;
var SETA_ABAIXO = 40;
var ESPACO = 32;
var ENTER = 13;


function Teclado( elemento )
{
    this.disparadas = [];
    this.funcoesDisparo = []
    this.pressionadas = [];
    this.elemento = elemento;
    this.callbacks = [];

    var teclado = this;
    elemento.addEventListener('keydown',
        function (evento) {

            var tecla = evento.keyCode;
            teclado.pressionadas[tecla] = true;
            if (!teclado.disparadas[tecla] && teclado.funcoesDisparo[tecla])
            {
                teclado.disparadas[tecla] = true;
                teclado.funcoesDisparo[tecla]();
            }
                
        });

    elemento.addEventListener('keyup',
        function (evento) {
            var tecla = evento.keyCode;
            teclado.pressionadas[evento.keyCode] = false;
            teclado.disparadas[tecla] = false;
        });
}

Teclado.prototype = {
    pressionada: function (tecla) {
        return this.pressionadas[tecla];
    },

    disparou: function (tecla, callback) {
        this.funcoesDisparo[tecla] = callback;
    }

}