import { GenericOutputDTO } from "../../../utils/dto/GenericOutputDTO";
import { Produto } from "../entities/Produto";

export interface ProdutoOutputDTO extends GenericOutputDTO {
    produto?: Produto
}