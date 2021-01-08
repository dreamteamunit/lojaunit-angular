import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Marca } from '../marca';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'app-marca-search',
  templateUrl: './marca-search.component.html',
  styleUrls: ['./marca-search.component.css'],
})
export class MarcaSearchComponent implements OnInit {
  marca: Observable<Marca>;
  @Input() inputMarca: Marca;
  private searchTerms = new Subject<string>();

  constructor(private marcaService: MarcaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  getMarca(): void {
    this.marca.subscribe(
      (marca) => 
      {
        //console.log(marca);
        this.inputMarca = marca
      }
    );
  }

  ngOnInit(): void {
    this.marca = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.marcaService.searchMarca(term);
      })
    );
    this.getMarca();
  }
}
