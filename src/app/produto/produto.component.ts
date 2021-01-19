import { Component, OnInit } from '@angular/core';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { MessageService } from '../message.service';

import { Categoria } from '../categoria';
import { Fornecedor } from '../fornecedor';
import { Marca } from '../marca';

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css'],
})

export class ProdutoComponent implements OnInit {
    produtos: Produto[];

    constructor(
        private ProdutoService: ProdutoService
    ){}

    ngOnInit(){
        this.getProduto();
        //console.log(this.produtos)
    }

    getProduto(): void {
        this.ProdutoService.getProduto().subscribe((produto) => (this.produtos = produto));
    }

    delete(produto: Produto): void {
        this.produtos = this.produtos.filter((h) => h !== produto);
        this.ProdutoService.deleteProduto(produto).subscribe();
    }

    add(nome: string,descricao: string,precoUnitario: number,unidade: string,categoria: Categoria,fornecedor: Fornecedor,marca: Marca): void {
        nome = nome.trim();
        /*descricao = descricao.trim();
        unidade = unidade.trim();*/
        categoria = categoria;
        fornecedor = fornecedor;
        marca = marca;
        if (!nome && !categoria && !fornecedor && !marca) {
            return;
        }
        this.ProdutoService.addProduto({ nome, descricao, precoUnitario, unidade, categoria, fornecedor, marca } as Produto).subscribe((produto) => {
            this.produtos.push(produto);
        });
    }
}