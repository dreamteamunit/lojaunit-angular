import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Venda } from '../venda';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-venda-search',
  templateUrl: './venda-search.component.html',
  styleUrls: ['./venda-search.component.css'],
})
export class VendaSearchComponent implements OnInit {
  venda: Observable<Venda>;
  @Input() inputVenda: Venda;
  private searchTerms = new Subject<string>();

  constructor(private vendaService: VendaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getVenda(): void {
    this.venda.subscribe((venda) => {
      //console.log(venda);
      this.inputVenda = venda;
    });
  }

  ngOnInit(): void {
    this.venda = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.vendaService.searchVenda(term);
      })
    );
    this.getVenda();
  }
}
