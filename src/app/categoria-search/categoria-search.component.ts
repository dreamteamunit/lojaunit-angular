import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-search',
  templateUrl: './categoria-search.component.html',
  styleUrls: ['./categoria-search.component.css'],
})
export class CategoriaSearchComponent implements OnInit {
  categoria: Observable<Categoria>;
  @Input() inputCategoria: Categoria;
  private searchTerms = new Subject<string>();

  constructor(private categoriaService: CategoriaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getCategoria(): void {
    this.categoria.subscribe((categoria) => {
      //console.log(categoria);
      this.inputCategoria = categoria;
    });
  }

  ngOnInit(): void {
    this.categoria = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.categoriaService.searchCategoria(term);
      })
    );
    this.getCategoria();
  }
}
