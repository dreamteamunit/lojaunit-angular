import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormaPagamento } from '../formaPagamento';
import { FormaPagamentoService } from '../formaPagamento.service';

@Component({
  selector: 'app-forma-pagamento-search',
  templateUrl: './forma-pagamento-search.component.html',
  styleUrls: ['./forma-pagamento-search.component.css'],
})
export class FormaPagamentoSearchComponent implements OnInit {
  formaPagamento: Observable<FormaPagamento>;
  @Input() inputFormaPagamento: FormaPagamento;
  private searchTerms = new Subject<string>();

  constructor(private formaPagamentoService: FormaPagamentoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getFormaPagamento(): void {
    this.formaPagamento.subscribe((formaPagamento) => {
      //console.log(formaPagamento);
      this.inputFormaPagamento = formaPagamento;
    });
  }

  ngOnInit(): void {
    this.formaPagamento = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.formaPagamentoService.searchFormaPagamento(term);
      })
    );
    this.getFormaPagamento();
  }
}
