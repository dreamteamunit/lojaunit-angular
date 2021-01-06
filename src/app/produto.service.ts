import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from './produto';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class ProdutoService {
    private api = 'https://lojaunitspring.herokuapp.com/produto/all';
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
      ) {}

      getProduto(): Observable<Produto[]> {console.log('a');
    return this.http.get<Produto[]>(this.api).pipe(
      tap((_) => this.log('Produtos recuperados')),
      catchError(this.handleError<Produto[]>('getProduto', []))
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
    this.messageService.add(`ProdutoService: ${message}`);
  }
}
