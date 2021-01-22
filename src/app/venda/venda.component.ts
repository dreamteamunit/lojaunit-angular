import { Component, OnInit } from '@angular/core';

import { Venda } from '../venda';
import { VendaService } from '../venda.service';
import { MessageService } from '../message.service';
import { FormaPagamento } from '../formaPagamento';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
})
export class VendaComponent implements OnInit {
  vendas: Venda[];

  constructor(private VendaService: VendaService) {}

  ngOnInit() {
    this.getVenda();
  }

  getVenda(): void {
    this.VendaService.getVenda().subscribe((venda) => (this.vendas = venda));
  }
  delete(venda: Venda): void {
    this.vendas = this.vendas.filter((h) => h !== venda);
    this.VendaService.deleteVenda(venda).subscribe();
  }
  add(idCliente: Cliente, idFormaPagamento: FormaPagamento, valorTotal: number): void {

    let datahora = new Date().toISOString().replace("Z","");
    
    if (!idCliente && !idFormaPagamento) {
      return;
    }
    this.VendaService.addVenda({ datahora, idCliente, idFormaPagamento, valorTotal } as Venda).subscribe((venda) => {
      this.vendas.push(venda);
    });
     window.location.reload(); 
  }
}