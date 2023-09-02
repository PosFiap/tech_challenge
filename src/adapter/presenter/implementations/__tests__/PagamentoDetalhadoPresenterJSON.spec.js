const { EStatusPagamento } = require("../../../../modules/common/value-objects/EStatusPagamento");
const { PagamentoDetalhadoPresenterJSON } = require("./../PagamentoDetalhadoPresenterJSON");

describe("Testa o presenter de Pagamento Detalhado", () => {

    it("Deve retornar um presenter JSON completo", () => {
        const pagamentoDetalhadoPresenterJSON = new PagamentoDetalhadoPresenterJSON(
            10,
            5,
            "H12D34",
            EStatusPagamento["Aguardando Pagamento"],
            new Date(Date.UTC(2023,1,20,15,30)),
            new Date(Date.UTC(2023,1,20,15,32)),
            "84911511095"
        );
        expect(pagamentoDetalhadoPresenterJSON.format())
            .toEqual({
                codigo_fatura: "H12D34",
                data_atualizacao: "20/02/2023 15:32",
                data_fatura: "20/02/2023 15:30",
                numero_pedido: "5",
                status: "Aguardando Pagamento",
                CPF_cliente: "849.115.110-95"
            });
    });

    it("Deve retornar um presenter JSON sem CPF", () => {
        const pagamentoDetalhadoPresenterJSON = new PagamentoDetalhadoPresenterJSON(
            10,
            5,
            "H12D34",
            EStatusPagamento.Pago,
            new Date(Date.UTC(2023,1,20,15,30)),
            new Date(Date.UTC(2023,1,20,15,32)),
        );
        expect(pagamentoDetalhadoPresenterJSON.format())
            .toEqual({
                codigo_fatura: "H12D34",
                data_atualizacao: "20/02/2023 15:32",
                data_fatura: "20/02/2023 15:30",
                numero_pedido: "5",
                status: "Pago"
            });
    });

});