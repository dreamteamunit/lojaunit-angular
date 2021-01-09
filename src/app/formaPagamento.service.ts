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
    private api = 'https://lojaunitspring.herokuapp.com/formapagamento/all';
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
      ) {}

      getFormaPagamento(): Observable<FormaPagamento[]> {console.log('a');
    return this.http.get<FormaPagamento[]>(this.api).pipe(
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
