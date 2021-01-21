import { Component, OnInit, Input } from '@angular/core';
import { ItensVenda } from '../itens-venda';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItensVendaService } from '../itens-venda.service';

@Component({
  selector: 'app-itens-venda-detail',
  templateUrl: './itens-venda-detail.component.html',
  styleUrls: ['./itens-venda-detail.component.css'],
})
export class ItensVendaDetailComponent implements OnInit {
  @Input() itensVenda: ItensVenda;

  constructor(
    private route: ActivatedRoute,
    private itensVendaService: ItensVendaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItensVenda();
  }
  getItensVenda(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itensVendaService
      .getItensVendaById(id)
      .subscribe((itensVenda) => (this.itensVenda = itensVenda));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.itensVendaService.updateItensVenda(this.itensVenda).subscribe(() => this.goBack());
  } 
}