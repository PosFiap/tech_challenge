import { IProdutoRegistry } from "../produto/ports/IProdutoRegistry";
import { AtualizaStatusPedidoOutputDTO } from "./dto/AtualizaStatusPedidoOutputDTO";
import { ItemListaPedidoOutputDTO, ItemPedidoListaPedidoOutputDTO } from "./dto/ListaPedidoOutputDTO";
import { PedidoDTO } from "./dto/PedidoDTO";
import { PedidoOutputDTO } from "./dto/PedidoOutputDTO";
import { ECategoria } from "./value-objects/ECategoria";
import { EStatus } from "./value-objects/EStatus";
import { Pedido } from "./entities/Pedido";
import { IAtualizaStatusPedidoUseCase, IPedidoRegistry, IRegistraPedidoUseCase } from "./ports";
import { IListaPedidosUseCase } from "./ports/IListaPedidosUseCase";
import { AtualizaStatusPedidoDTO } from "./dto";
import { CustomError, CustomErrorType } from "../../utils/customError";

export class PedidoService implements IRegistraPedidoUseCase, IListaPedidosUseCase, IAtualizaStatusPedidoUseCase {

    constructor(readonly repository: IPedidoRegistry) {}

    async atualizaStatus(data: AtualizaStatusPedidoDTO): Promise<AtualizaStatusPedidoOutputDTO> {
        
        const erros = data.validaDTO();
        if(erros.length) throw new CustomError(CustomErrorType.InvalidInputDTO, erros.join("\n"));

        const { codigoPedido, codigoStatus } = data;
        let pedidoAtualizado;

        try{
            const statusAtualDoPedido = await this.repository.obtemStatusPedido(codigoPedido);
            
            //Um pedido só pode ser atualizado para um status posterior
            if(statusAtualDoPedido >= codigoStatus)
                throw new CustomError(CustomErrorType.BusinessRuleViolation, "O status indicado não é válido para esse pedido");
            pedidoAtualizado = await this.repository.atualizaStatusPedido(codigoPedido, codigoStatus);    
        } catch (err) {
            if(err instanceof CustomError) throw err;
            throw new CustomError(CustomErrorType.RepositoryUnknownError, (err as Error).message);
        }
        
        return new AtualizaStatusPedidoOutputDTO(
            pedidoAtualizado.codigo!,
            EStatus[pedidoAtualizado.status]
        );
    }


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