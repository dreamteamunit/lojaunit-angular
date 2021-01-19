import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-search',
  templateUrl: './produto-search.component.html',
  styleUrls: ['./produto-search.component.css'],
})
export class ProdutoSearchComponent implements OnInit {
  produto: Observable<Produto>;
  @Input() inputProduto: Produto;
  private searchTerms = new Subject<string>();

  constructor(private produtoService: ProdutoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getProduto(): void {
    this.produto.subscribe((produto) => {
      //console.log(produto);
      this.inputProduto = produto;
    });
  }

  ngOnInit(): void {
    this.produto = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.produtoService.searchProduto(term);
      })
    );
    this.getProduto();
  }
}
