import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-search',
  templateUrl: './cliente-search.component.html',
  styleUrls: ['./cliente-search.component.css'],
})
export class ClienteSearchComponent implements OnInit {
  cliente: Observable<Cliente>;
  @Input() inputCliente: Cliente;
  private searchTerms = new Subject<string>();

  constructor(private clienteService: ClienteService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getCliente(): void {
    this.cliente.subscribe((cliente) => {
      //console.log(cliente);
      this.inputCliente = cliente;
    });
  }

  ngOnInit(): void {
    this.cliente = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.clienteService.searchCliente(term);
      })
    );
    this.getCliente();
  }
}
