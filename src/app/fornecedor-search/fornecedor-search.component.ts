import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-search',
  templateUrl: './fornecedor-search.component.html',
  styleUrls: ['./fornecedor-search.component.css'],
})
export class FornecedorSearchComponent implements OnInit {
  fornecedor: Observable<Fornecedor>;
  @Input() inputFornecedor: Fornecedor;
  private searchTerms = new Subject<string>();

  constructor(private fornecedorService: FornecedorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getFornecedor(): void {
    this.fornecedor.subscribe((fornecedor) => {
      //console.log(fornecedor);
      this.inputFornecedor = fornecedor;
    });
  }

  ngOnInit(): void {
    this.fornecedor = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.fornecedorService.searchFornecedor(term);
      })
    );
    this.getFornecedor();
  }
}
