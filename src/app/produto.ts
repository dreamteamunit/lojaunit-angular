import { Categoria } from "./categoria";
import { Marca } from "./marca";
import { Fornecedor } from "./fornecedor";
export interface Produto {
    id: number,
    nome: string,
    descricao: string,
    precoUnitario: number,
    unidade: string;
    categoria: Categoria;
    fornecedor: Fornecedor;
    marca: Marca;
}