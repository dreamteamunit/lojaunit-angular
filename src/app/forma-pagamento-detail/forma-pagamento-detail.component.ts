import { Component, OnInit, Input } from '@angular/core';
import { FormaPagamento } from '../formaPagamento';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormaPagamentoService } from '../formaPagamento.service';

@Component({
  selector: 'app-forma-pagamento-detail',
  templateUrl: './forma-pagamento-detail.component.html',
  styleUrls: ['./forma-pagamento-detail.component.css'],
})
export class FormaPagamentoDetailComponent implements OnInit {
  @Input() formaPagamento: FormaPagamento;

  constructor(
    private route: ActivatedRoute,
    private formaPagamentoService: FormaPagamentoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFormaPagamento();
  }
  getFormaPagamento(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.formaPagamentoService
      .getFormaPagamentoById(id)
      .subscribe((formaPagamento) => (this.formaPagamento = formaPagamento));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.formaPagamentoService.updateFormaPagamento(this.formaPagamento).subscribe(() => this.goBack());
  } 
}