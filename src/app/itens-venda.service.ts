import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ItensVenda } from './itens-venda';

@Injectable({
  providedIn: 'root',
})
export class ItensVendaService {
  private api = 'https://lojaunitspring.herokuapp.com/itensvenda';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getItensVenda(): Observable<ItensVenda[]> {
    return this.http.get<ItensVenda[]>(this.api + '/all').pipe(
      tap((_) => this.log('ItensVendas recuperados')),
      catchError(this.handleError<ItensVenda[]>('getItensVenda', []))
    );
  }
  deleteItensVenda(itensvenda: ItensVenda | number): Observable<ItensVenda> {
    const id = typeof itensvenda === 'number' ? itensvenda : itensvenda.id;
    const url = `${this.api}/delete/${id}`;

    return this.http.delete<ItensVenda>(url, this.httpOptions).pipe(
      tap((_) => this.log(`itensvenda deletado id=${id}`)),
      catchError(this.handleError<ItensVenda>('deleteItensVenda'))
    );
  }

  /** POST: add a new fa to the server */
  addItensVenda(itensvenda: ItensVenda): Observable<ItensVenda> {
    return this.http.post<ItensVenda>(this.api + '/add', itensvenda, this.httpOptions).pipe(
      tap((novoItensVenda: ItensVenda) => this.log(`itensvenda adicionado com id=${novoItensVenda.id}`)),
      catchError(this.handleError<ItensVenda>('addItensVenda'))
    );
  }

  getItensVendaById(id: number): Observable<ItensVenda> {
    const url = `${this.api}/find/${id}`;
    return this.http.get<ItensVenda>(url).pipe(
      tap((_) => this.log(`daq recuperada id=${id}`)),
      catchError(this.handleError<ItensVenda>(`getItensVenda id=${id}`))
    );
  }

  updateItensVenda(itensvenda: ItensVenda): Observable<ItensVenda> {
    return this.http
      .put(`${this.api}/update/${itensvenda.id}`, itensvenda, this.httpOptions)
      .pipe(
        tap((_) => this.log(`itensvenda atualizada id=${itensvenda.id}`)),
        catchError(this.handleError<ItensVenda>('updateItensVenda'))
      );
  }
  searchItensVenda(term: string): Observable<ItensVenda> {
    if (!term.trim()) {
      // if not search term, return empty marc array.
      return of(null);
    }
    return this.http.get<ItensVenda>(`${this.api}/find/${term}`).pipe(
      tap((x) => {
        //console.log(x);
        x != null
          ? this.log(`itensvenda retornada "${x.id}"`)
          : this.log(`itensvenda nao encontrada "${term}"`);
      }),
      catchError(this.handleError<ItensVenda>('searchItensVenda', null))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItensVendaService: ${message}`);
  }
}
