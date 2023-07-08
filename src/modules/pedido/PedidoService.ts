
import { IProdutoRepository } from "../produto/ports/IProdutoRegistry";
import { PedidoDTO } from "./dto/PedidoDTO";
import { PedidoOutputDTO } from "./dto/PedidoOutputDTO";
import { ECategoria } from "./value-objects/ECategoria";
import { EStatus } from "./value-objects/EStatus";
import { Pedido } from "./entities/Pedido";
import { IAtualizaStatusPedidoUseCase, IPedidoRegistry, IRegistraPedidoUseCase } from "./ports";
import { IListaPedidosUseCase } from "./ports/IListaPedidosUseCase";
import { AtualizaStatusPedidoDTO } from "./dto";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { ItemDePedido } from "./entities/ItemDePedido";

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
                    pedido.codigo!,
                    pedido.CPF,
                    itensDePedido
                )
            });
        return listaPedidos;
    }

    async registraPedido(data: PedidoDTO, produtoRegistry: IProdutoRegistry): Promise<PedidoOutputDTO> {
        
        const erros = data.validaDTO();
        if(erros.length) throw new CustomError(CustomErrorType.InvalidInputDTO, erros.join("\n"));
        
        let pedidoInserido: Pedido;

        try{

            const itensDePedidoCompletos = await Promise.all(data.itemDePedido.map(async ({codigo}) => {
                const produto: ItemDePedido = await produtoRegistry.buscaProdutoPorCodigo(codigo);
                if(!produto) throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Item de pedido não encontrado');
                return produto;
            }));
    
            pedidoInserido = await this.repository.registraPedido(new Pedido(
                data.CPF,
                EStatus["Aguardando Pagamento"],
                itensDePedidoCompletos,
                null
            ));
        } catch(err) {
            if(err instanceof CustomError) throw err;
            throw new CustomError(CustomErrorType.RepositoryUnknownError, (err as Error).message);
        }

        return new PedidoOutputDTO(
            EStatus[pedidoInserido.status],
            pedidoInserido.codigo!,
            pedidoInserido.itensDePedido.reduce((soma, item) => soma + item.valor, 0)
        )
    }
}