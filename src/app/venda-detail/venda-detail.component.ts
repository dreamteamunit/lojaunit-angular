import { Component, OnInit, Input } from '@angular/core';
import { Venda } from '../venda';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VendaService } from '../venda.service';

@Component({
  selector: 'app-venda-detail',
  templateUrl: './venda-detail.component.html',
  styleUrls: ['./venda-detail.component.css'],
})
export class VendaDetailComponent implements OnInit {
  @Input() venda: Venda;

  constructor(
    private route: ActivatedRoute,
    private vendaService: VendaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVenda();
  }
  getVenda(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vendaService
      .getVendaById(id)
      .subscribe((venda) => (this.venda = venda));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.vendaService.updateVenda(this.venda).subscribe(() => this.goBack());
  } 
}