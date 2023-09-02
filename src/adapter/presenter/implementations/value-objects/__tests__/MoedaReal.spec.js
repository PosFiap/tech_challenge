const { CustomError } = require("../../../../../utils");
const { MoedaReal } = require("./../MoedaReal");

describe("Testa o Objeto de Valor MoedaReal", () =>{

    it("o valor nulo deve retornar erro", () => {
        try {
            new MoedaReal();
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });

    it("o valor < 0 deve retornar erro", () => {
        try {
            new MoedaReal(-1);
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });

    it("o valor 0 deve retornar R$ 0,00", () => {
        const moeda = new MoedaReal(0);
        const formatacao = moeda.formataMoeda();
        expect(formatacao).toBe("R$ 0,00");
    });

    it("o valor 0.33333 deve retornar R$ 0,33", () => {
        const moeda = new MoedaReal(0.33333);
        const formatacao = moeda.formataMoeda();
        expect(formatacao).toBe("R$ 0,33");
    });

    it("o valor 1.999999999999 deve retornar R$ 2.00", () => {
        const moeda = new MoedaReal(1.999999999999);
        const formatacao = moeda.formataMoeda();
        expect(formatacao).toBe("R$ 2,00");
    });

    it("o valor 1000 deve retornar R$ 1.000,00", () => {
        const moeda = new MoedaReal(1000);
        const formatacao = moeda.formataMoeda();
        expect(formatacao).toBe("R$ 1.000,00");
    });

    it("o valor 10000 deve retornar R$ 10.000,00", () => {
        const moeda = new MoedaReal(10000);
        const formatacao = moeda.formataMoeda();
        expect(formatacao).toBe("R$ 10.000,00");
    });

    it("o valor 100000 deve retornar R$ 100.000,00", () => {
        const moeda = new MoedaReal(100000);
        const formatacao = moeda.formataMoeda();
        expect(formatacao).toBe("R$ 100.000,00");
    });

    it("o valor 1000000 deve retornar R$ 1.000.000,00", () => {
        const moeda = new MoedaReal(1000000);
        const formatacao = moeda.formataMoeda();
        expect(formatacao).toBe("R$ 1.000.000,00");
    });
});