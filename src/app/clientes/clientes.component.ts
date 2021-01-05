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
      .subscribe((clientes) => (this.clientes = clientes));
  }
}
