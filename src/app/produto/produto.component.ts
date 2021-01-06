import { Component, OnInit } from '@angular/core';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { MessageService } from '../message.service';

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
    }

    getProduto(): void {
        this.ProdutoService
        .getProduto()
        .subscribe((produto) => (this.produtos = produto))
    }
}