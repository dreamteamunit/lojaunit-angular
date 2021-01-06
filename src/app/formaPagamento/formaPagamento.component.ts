import { Component, OnInit } from '@angular/core';

import { FormaPagamento } from '../formaPagamento';
import { FormaPagamentoService } from '../formaPagamento.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-formaPagamento',
    templateUrl: './formaPagamento.component.html',
    styleUrls: ['./formaPagamento.component.css'],
})

export class FormaPagamentoComponent implements OnInit {
    formasPagamento: FormaPagamento[];

    constructor(
        private FormaPagamentoService: FormaPagamentoService
    ){}

    ngOnInit(){
        this.getFormaPagamento();
    }

    getFormaPagamento(): void {
        this.FormaPagamentoService
        .getFormaPagamento()
        .subscribe((formaPagamento) => (this.formasPagamento = formaPagamento))
    }
}