import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Venda } from './venda';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class VendaService {
    //private api = 'https://lojaunitspring.herokuapp.com/venda/all';
    private api = 'https://lojaunitspring.herokuapp.com/venda';
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text' as 'json',
      }),
    };

    httpOptionsPlain = {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
      ) {}

    getVenda(): Observable<Venda[]> {
      return this.http.get<Venda[]>(this.api + '/all').pipe(
        tap((_) => this.log('Vendas recuperadas')),
        catchError(this.handleError<Venda[]>('getVenda', []))
    );
  }

  deleteVenda(venda: Venda | number): Observable<Venda> {
    const id = typeof venda === 'number' ? venda : venda.id;
    const url = `${this.api}/delete/${id}`;

    return this.http.delete<Venda>(url, this.httpOptions).pipe(
      tap((_) => this.log(`venda deletado id=${id}`)),
      catchError(this.handleError<Venda>('deleteVenda'))
    );
  }

  /** POST: add a new fa to the server */
  addVenda(venda: Venda): Observable<Venda> {
    return this.http
      .post<Venda>(this.api + '/add', venda, this.httpOptions)
      .pipe(
        tap((novoVenda: Venda) =>
          this.log(`venda adicionado com id=${novoVenda.id}`)
        ),
        catchError(this.handleError<Venda>('addVenda'))
      );
  }

  getVendaById(id: number): Observable<Venda> {
    const url = `${this.api}/find/${id}`;
    return this.http.get<Venda>(url).pipe(
      tap((_) => this.log(`venda recuperada id=${id}`)),
      catchError(this.handleError<Venda>(`getVenda id=${id}`))
    );
  }

  updateVenda(venda: Venda): Observable<any> {
    return this.http
      .put(`${this.api}/update/${venda.id}`, venda, this.httpOptions)
      .pipe(
        tap((_) => this.log(`venda atualizada id=${venda.id}`)),
        catchError(this.handleError<any>('updateVenda'))
      );
  }
  searchVenda(term: string): Observable<Venda> {
    if (!term.trim()) {
      // if not search term, return empty marc array.
      return of(null);
    }
    return this.http.get<Venda>(`${this.api}/find/${term}`).pipe(
      tap((x) => {
        //console.log(x);
        x != null
          ? this.log(`venda retornada "${x.id}"`)
          : this.log(`venda nao encontrada "${term}"`);
      }),
      catchError(this.handleError<Venda>('searchVenda', null))
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
    this.messageService.add(`VendaService: ${message}`);
  }
}
