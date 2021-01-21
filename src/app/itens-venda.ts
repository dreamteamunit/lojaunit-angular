import { Produto } from './produto';

export interface ItensVenda {
  id?: number;
  quantidade?: number;
  valorUnitario?: number;
  idVenda?: Venda;
  idProduto?: Produto;
}