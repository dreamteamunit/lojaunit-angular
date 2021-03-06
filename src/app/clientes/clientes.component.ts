import { Component, OnInit } from '@angular/core';

import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService
      .getClientes()
      .subscribe((cliente) => (this.clientes = cliente));
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter((h) => h !== cliente);
    this.clienteService.deleteCliente(cliente).subscribe();
  }

  add(nome: string, cpf: string, email: string, dataNascimento: Date, sexo: string, nomeSocial: string, apelido: string, telefone: string): void {
    nome = nome.trim();
    cpf = cpf.trim();
    email = email.trim();
    //sexo = sexo.trim();
    //telefone = telefone.trim();
    //dataNascimento = dataNascimento.trim();
    //nomeSocial = nomeSocial.trim();
    //apelido = apelido.trim();
    if (!nome && !cpf && !email) {
      return;
    }
    this.clienteService.addCliente({ nome, cpf, email, dataNascimento, sexo, nomeSocial, apelido, telefone } as Cliente).subscribe((cliente) => {
      this.clientes.push(cliente);
    });
  }
}
