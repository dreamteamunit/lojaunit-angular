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

    delete(categoria: Categoria): void {
        this.categorias = this.categorias.filter((h) => h !== categoria);
        this.CategoriaService.deleteCategoria(categoria).subscribe();
    }

    add(nome: string, ativo: boolean): void {
        nome = nome.trim();
        if (!nome && !ativo) {
          return;
        }
        this.CategoriaService.addCategoria({ nome, ativo } as Categoria).subscribe((categoria) => {
          this.categorias.push(categoria);
        });
    }
}