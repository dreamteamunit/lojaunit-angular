import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormaPagamento } from './formaPagamento';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class FormaPagamentoService {
    //private api = 'https://lojaunitspring.herokuapp.com/formapagamento/all';
    private api = 'https://lojaunitspring.herokuapp.com/formapagamento';
  
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

    getFormaPagamento(): Observable<FormaPagamento[]> {
      return this.http.get<FormaPagamento[]>(this.api + '/all').pipe(
      tap((_) => this.log('Forma de Pagamento recuperadas')),
      catchError(this.handleError<FormaPagamento[]>('getFormaPagamento', []))
    );
  }

  deleteFormaPagamento(formaPagamento: FormaPagamento | number): Observable<FormaPagamento> {
    const id = typeof formaPagamento === 'number' ? formaPagamento : formaPagamento.id;
    const url = `${this.api}/delete/${id}`;

    return this.http.delete<FormaPagamento>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Forma de Pagamento deletada id=${id}`)),
      catchError(this.handleError<FormaPagamento>('deleteFormaPagamento'))
    );
  }

  /** POST: add a new forma de pagamento to the server */
  addFormaPagamento(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.http
      .post<FormaPagamento>(this.api + '/add', formaPagamento, this.httpOptions)
      .pipe(
        tap((novaFormaPagamento: FormaPagamento) =>
          this.log(`forma de pagamento adicionada com id=${novaFormaPagamento.id}`)
        ),
        catchError(this.handleError<FormaPagamento>('addFormaPagamento'))
      );
  }

  getFormaPagamentoById(id: number): Observable<FormaPagamento> {
    const url = `${this.api}/find/${id}`;
    return this.http.get<FormaPagamento>(url).pipe(
      tap((_) => this.log(`formaPagamento recuperada id=${id}`)),
      catchError(this.handleError<FormaPagamento>(`getFormaPagamento id=${id}`))
    );
  }
  updateFormaPagamento(formaPagamento: FormaPagamento): Observable<any> {
    return this.http
      .put(`${this.api}/update/${formaPagamento.id}`, formaPagamento, this.httpOptions)
      .pipe(
        tap((_) => this.log(`formaPagamento atualizada id=${formaPagamento.id}`)),
        catchError(this.handleError<any>('updateFormaPagamento'))
      );
  }
  searchFormaPagamento(term: string): Observable<FormaPagamento> {
    if (!term.trim()) {
      // if not search term, return empty marc array.
      return of(null);
    }
    return this.http.get<FormaPagamento>(`${this.api}/find/${term}`).pipe(
      tap((x) => {
        //console.log(x);
        x != null
          ? this.log(`formaPagamento retornada "${x.forma}"`)
          : this.log(`formaPagamento nao encontrada "${term}"`);
      }),
      catchError(this.handleError<FormaPagamento>('searchFormaPagamento', null))
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
    this.messageService.add(`FormaPagamentoService: ${message}`);
  }
}
