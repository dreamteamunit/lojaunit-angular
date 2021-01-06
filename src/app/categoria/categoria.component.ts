import { Component, OnInit } from '@angular/core';

import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css'],
})

export class CategoriaComponent implements OnInit {
    categorias: Categoria[];

    constructor(
        private CategoriaService: CategoriaService
    ){}

    ngOnInit(){
        this.getCategoria();
    }

    getCategoria(): void {
        this.CategoriaService
        .getCategoria()
        .subscribe((categoria) => (this.categorias = categoria))
    }
}