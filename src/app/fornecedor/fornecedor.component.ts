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

  delete(fornecedor: Fornecedor): void {
    this.fornecedor = this.fornecedor.filter((h) => h !== fornecedor);
    this.FornecedorService.deleteFornecedor(fornecedor).subscribe();
  }
  add(nome: string,endereco: string,telefone: string,cnpj: string,email: string): void {
    nome = nome.trim();
    //endereco = endereco.trim();
    //telefone = telefone.trim();
    cnpj = cnpj.trim();
    //email = email.trim();
    if (!nome && !cnpj) {
      return;
    }
    this.FornecedorService.addFornecedor({ nome, endereco, telefone, cnpj, email } as Fornecedor).subscribe((fornecedor) => {
      this.fornecedor.push(fornecedor);
    });
  }

}
