import { Cliente } from "./cliente";
import { FormaPagamento } from "./formaPagamento";
export interface Venda {
    id?: number,
    datahora?: string,
    idCliente?: Cliente,
    idFormaPagamento?: FormaPagamento,
    valorTotal?: number;
}