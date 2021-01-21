import { Produto } from './produto';
import { Venda } from './venda';

export interface ItensVenda {
  id?: number;
  quantidade?: number;
  valorUnitario?: number;
  idVenda?: Venda;
  idProduto?: Produto;
}