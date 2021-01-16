import { Produto } from "./produto";
export interface Faq {
    id?: number,
    datahora?: Date,
    texto?: string,
    produto?: Produto;
}