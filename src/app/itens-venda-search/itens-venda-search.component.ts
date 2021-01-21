import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ItensVenda } from '../itens-venda';
import { ItensVendaService } from '../itens-venda.service';

@Component({
  selector: 'app-itens-venda-search',
  templateUrl: './itens-venda-search.component.html',
  styleUrls: ['./itens-venda-search.component.css'],
})
export class ItensVendaSearchComponent implements OnInit {
  itensVenda: Observable<ItensVenda>;
  @Input() inputItensVenda: ItensVenda;
  private searchTerms = new Subject<string>();

  constructor(private itensVendaService: ItensVendaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getItensVenda(): void {
    this.itensVenda.subscribe((itensVenda) => {
      //console.log(itensVenda);
      this.inputItensVenda = itensVenda;
    });
  }

  ngOnInit(): void {
    this.itensVenda = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.itensVendaService.searchItensVenda(term);
      })
    );
    this.getItensVenda();
  }
}
