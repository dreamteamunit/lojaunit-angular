import { Component, OnInit, Input } from '@angular/core';
import { ItensVenda } from '../itens-venda';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItensVendaService } from '../itens-venda.service';

@Component({
  selector: 'app-itens-venda-search',
  templateUrl: './itens-venda-search.component.html',
  styleUrls: ['./itens-venda-search.component.css'],
})
export class ItensVendaSearchComponent implements OnInit {
  @Input() inputItensVenda: ItensVenda;
  private searchTerms = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private itensVendaService: ItensVendaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItensVenda();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getItensVenda(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itensVendaService
      .getItensVendaById(id)
      .subscribe((itensVenda) => (this.inputItensVenda = itensVenda));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.itensVendaService.updateItensVenda(this.itensVenda).subscribe(() => this.goBack());
  } 
}