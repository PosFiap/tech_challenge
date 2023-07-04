import { IProdutoRegistry } from "../produto/ports/IProdutoRegistry";
import { ItemListaPedidoOutputDTO, ItemPedidoListaPedidoOutputDTO } from "./dto/ListaPedidoOutputDTO";
import { PedidoDTO } from "./dto/PedidoDTO";
import { PedidoOutputDTO } from "./dto/PedidoOutputDTO";
import { ECategoria } from "./entities/ECategoria";
import { EStatus } from "./entities/EStatus";
import { Pedido } from "./entities/Pedido";
import { IPedidoRegistry, IRegistraPedidoUseCase } from "./ports";
import { IListaPedidosUseCase } from "./ports/IListaPedidosUseCase";

export class PedidoService implements IRegistraPedidoUseCase, IListaPedidosUseCase {

    constructor(readonly repository: IPedidoRegistry) {}

    async listaPedidos(): Promise<Array<ItemListaPedidoOutputDTO>> {
        const pedidosArmazenados = await this.repository.listaPedidos();

        //map Entity to DTO
        const listaPedidos: Array<ItemListaPedidoOutputDTO> =
            pedidosArmazenados.map((pedido: Pedido) => {
                const itensDePedido: Array<ItemPedidoListaPedidoOutputDTO> =
                    pedido.itensDePedido.map(itemDePedido => {
                        return new ItemPedidoListaPedidoOutputDTO(
                            itemDePedido.nome,
                            itemDePedido.valor,
                            ECategoria[itemDePedido.categoria_codigo]
                        )
                    });
                
                
                return new ItemListaPedidoOutputDTO(
                    EStatus[pedido.status],
                    pedido.codigo as number,
                    pedido.CPF,
                    itensDePedido
                )
            });

        console.log(listaPedidos);

        return listaPedidos;
    }

    registraPedido(pedido: PedidoDTO, pedidoRegistry: IPedidoRegistry, produtoRegistry: IProdutoRegistry): PedidoOutputDTO {
        const itensDePedidoCompletos = pedido.ItemDePedido.map(({codigo}) => {
            return produtoRegistry.buscaProdutoPorCodigo(codigo);
        });

        const pedidoInserido = pedidoRegistry.registraPedido(new Pedido(
            pedido.CPF,
            EStatus["Aguardando Pagamento"],
            itensDePedidoCompletos,
            null
        ));

        return {
            codigo: pedidoInserido.codigo as number,
            status: pedidoInserido.status,
            valor: pedidoInserido.itensDePedido.reduce((soma, item) => soma + item.valor, 0)
        }
    }

     

}