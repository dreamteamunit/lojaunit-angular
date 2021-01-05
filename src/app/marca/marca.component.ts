import { Component, OnInit } from '@angular/core';

import { Marca } from '../marca';
import { MarcaService } from '../marca.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    styleUrls: ['./marca.component.css'],
})

export class MarcaComponent implements OnInit {
    marcas: Marca[];

    constructor(
        private MarcaService: MarcaService
    ){}

    ngOnInit(){
        this.getMarca();
    }

    getMarca(): void {
        this.MarcaService
        .getMarca()
        .subscribe((marca) => (this.marcas = marca))
    }
}