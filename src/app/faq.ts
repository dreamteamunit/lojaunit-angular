import { Produto } from "./produto";
export interface Faq {
    id?: number,
    datahora?: string,
    texto?: string,
    idProduto?: Produto;
}