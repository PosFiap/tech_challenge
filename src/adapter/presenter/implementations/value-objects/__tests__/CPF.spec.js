const { CustomError } = require("../../../../../utils");
const { CPF } = require("./../CPF");

describe("Testa o objeto de valor CPF", () => {

    it("O CPF 00000000000 deve retornar 000.000.000-00", () => {
        const cpf = new CPF("00000000000");
        expect(cpf.formataCPF()).toBe("000.000.000-00");
    });

    it("O CPF nulo deve retornar erro", () => {
        try{
            new CPF();
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });

    it("O CPF de tamanho 0 (inválido) deve retornar erro", () => {
        try{
            new CPF("");
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });

    it("O CPF de tamanho 10 (inválido) deve retornar erro", () => {
        try{
            new CPF("0000000000");
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });

    it("O CPF de tamanho 12 (inválido) deve retornar erro", () => {
        try{
            new CPF("000000000000");
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });
});