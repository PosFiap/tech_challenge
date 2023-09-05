const { CustomError } = require("../../../../../utils");
const { DataHora } = require("./../DataHora")

describe("Testa o Objeto de Valor DataHora", () =>{

    it("O valor maior que hoje deve retornar erro", () => {
        const data = new Date(Date.now() + 1000);
        try {
            new DataHora(data);
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });

    it("O valor null deve retornar erro", () => {
        const data = null;
        try {
            new DataHora(data);
        } catch (err) {
            expect(err).toBeInstanceOf(CustomError);
        }
    });

    it("O valor 2023,0,1,0,0 deve retornar 01/01/2023 00:00", () => {
        const data = new Date(Date.UTC(2023,0,1,0,0));
        const dataHora = new DataHora(data);
        expect(dataHora.formataData()).toBe("01/01/2023 00:00");
    });

    it("O valor 2022,11,31,23,59 deve retornar 31/12/2022 23:59", () => {
        const data = new Date(Date.UTC(2022,11,31,23,59));
        const dataHora = new DataHora(data);
        expect(dataHora.formataData()).toBe("31/12/2022 23:59");
    });
    
});