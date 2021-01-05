import { Component, OnInit } from '@angular/core';

import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
})
export class FornecedorComponent implements OnInit {
  fornecedor: Fornecedor[];

  constructor(
    private FornecedorService: FornecedorService
  ) {}

  ngOnInit() {
    this.getFornecedor();
  }

  getFornecedor(): void {
    this.FornecedorService
      .getFornecedor()
      .subscribe((fornecedor) => (this.fornecedor = fornecedor));
  }
}
