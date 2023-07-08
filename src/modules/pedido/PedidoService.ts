import { IProdutoRepository } from "../produto/ports/IProdutoRepository";
import { AtualizaStatusPedidoOutputDTO } from "./dto/AtualizaStatusPedidoOutputDTO";
import { ItemListaPedidoOutputDTO, ItemPedidoListaPedidoOutputDTO } from "./dto/ListaPedidoOutputDTO";
import { PedidoDTO } from "./dto/PedidoDTO";
import { PedidoOutputDTO } from "./dto/PedidoOutputDTO";
import { ECategoria } from "./value-objects/ECategoria";
import { EStatus } from "./value-objects/EStatus";
import { Pedido } from "./entities/Pedido";
import { AtualizaStatusPedidoDTO } from "./dto";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { ItemDePedido } from "./entities/ItemDePedido";
import { IPedidoRepository, IPedidoService } from "./ports";

export class PedidoService implements IPedidoService {

    constructor(readonly pedidoRepository: IPedidoRepository) {}

    async atualizaStatus(data: AtualizaStatusPedidoDTO): Promise<AtualizaStatusPedidoOutputDTO> {
        
        const erros = data.validaDTO();
        if(erros.length) throw new CustomError(CustomErrorType.InvalidInputDTO, erros.join("\n"));

        const { codigoPedido, codigoStatus } = data;
        let pedidoAtualizado;

        try{
            const statusAtualDoPedido = await this.pedidoRepository.obtemStatusPedido(codigoPedido);

            //Um pedido só pode ser atualizado para um status posterior
            if(statusAtualDoPedido >= codigoStatus)
                throw new CustomError(CustomErrorType.BusinessRuleViolation, "O status indicado não é válido para esse pedido");
            pedidoAtualizado = await this.pedidoRepository.atualizaStatusPedido(codigoPedido, codigoStatus);    
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
        const pedidosArmazenados = await this.pedidoRepository.listaPedidos();

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

    async registraPedido(data: PedidoDTO): Promise<PedidoOutputDTO> {
        
        const erros = data.validaDTO();
        if(erros.length) throw new CustomError(CustomErrorType.InvalidInputDTO, erros.join("\n"));
        
        let pedidoInserido: Pedido;

        try{

            const itensDePedidoCompletos = await Promise.all(data.itemDePedido.map(async ({codigo}) => {
                const produto: ItemDePedido = await produtoRepository.buscaProdutoPorCodigo(codigo);
                if(!produto) throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Item de pedido não encontrado');
                return produto;
            }));
    
            pedidoInserido = await this.pedidoRepository.registraPedido(new Pedido(
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