import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

import { ItensVenda } from '../itens-venda';
import { ItensVendaService } from '../itens-venda.service';
import { MessageService } from '../message.service';

import { Produto } from '../produto';
import { Venda } from '../venda';

@Component({
  selector: 'app-itens-venda',
  templateUrl: './itens-venda.component.html',
  styleUrls: ['./itens-venda.component.css'],
})
export class ItensVendaComponent implements OnInit {
  itensVendas: ItensVenda[];

  constructor(
    private ItensVendaService: ItensVendaService
  ) {}

  ngOnInit() {
    this.getItensVenda();
  }

  getItensVenda(): void {
    this.ItensVendaService
      .getItensVenda()
      .subscribe((itensVenda) => (this.itensVendas = itensVenda));
  }

  delete(itensVenda: ItensVenda): void {
    this.itensVendas = this.itensVendas.filter((h) => h !== itensVenda);
    this.ItensVendaService.deleteItensVenda(itensVenda).subscribe();
  }
  add(quantidade: number,valorUnitario: number,idProduto: Produto,idVenda: Venda): void {
    
    if (!quantidade && !idProduto && !valorUnitario && !idVenda) {
      return;
    }

    this.ItensVendaService.addItensVenda({ quantidade, valorUnitario, idProduto, idVenda } as ItensVenda).subscribe((itensVenda) => {
      this.itensVendas.push(itensVenda);
    });
  }

}
