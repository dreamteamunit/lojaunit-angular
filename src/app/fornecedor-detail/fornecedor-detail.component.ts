import { Component, OnInit, Input } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-detail',
  templateUrl: './fornecedor-detail.component.html',
  styleUrls: ['./fornecedor-detail.component.css'],
})
export class FornecedorDetailComponent implements OnInit {
  @Input() fornecedor: Fornecedor;

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFornecedor();
  }
  getFornecedor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fornecedorService
      .getFornecedorById(id)
      .subscribe((fornecedor) => (this.fornecedor = fornecedor));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.fornecedorService.updateFornecedor(this.fornecedor).subscribe(() => this.goBack());
  } 
}