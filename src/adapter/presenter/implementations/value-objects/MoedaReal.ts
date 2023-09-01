import { Moeda } from "./Moeda";

export class MoedaReal extends Moeda {

    formataMoeda(): string {
        let valorString = this.transformaValorEmTexto();
        valorString = valorString.replace(/,/g, '').replace('.', ',');
        const tamanhoCasasDecimais = 3;
        const quantidadeDigitosReais = valorString.length - tamanhoCasasDecimais;
        let valorStringPontuado = valorString;
        if(quantidadeDigitosReais > 3) {
            valorStringPontuado = "";
            console.debug(valorString, valorStringPontuado, quantidadeDigitosReais);
            if(quantidadeDigitosReais % 3 != 0)
                valorStringPontuado = valorString.substring(0, quantidadeDigitosReais % 3) + ".";
            console.debug(valorString, valorStringPontuado, quantidadeDigitosReais);
            valorStringPontuado += valorString
                .substring(quantidadeDigitosReais % 3, quantidadeDigitosReais)
                .replace(/(\d{3})(?!$)/g, "$1.");
            console.debug(valorString, valorStringPontuado, quantidadeDigitosReais);

            valorStringPontuado += valorString.substring(quantidadeDigitosReais);
        };
        valorString = `R$ ${valorStringPontuado}`;
        return valorString;
    }

}