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
    //private api = 'https://lojaunitspring.herokuapp.com/produto/all';
    private api = 'https://lojaunitspring.herokuapp.com/produto';
  
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

    getProduto(): Observable<Produto[]> {
      return this.http.get<Produto[]>(this.api + '/all').pipe(
        tap((_) => this.log('Produtos recuperados')),
        catchError(this.handleError<Produto[]>('getProduto', []))
    );
  }

  deleteProduto(produto: Produto | number): Observable<Produto> {
    const id = typeof produto === 'number' ? produto : produto.id;
    const url = `${this.api}/delete/${id}`;

    return this.http.delete<Produto>(url, this.httpOptions).pipe(
      tap((_) => this.log(`produto deletado id=${id}`)),
      catchError(this.handleError<Produto>('deleteProduto'))
    );
  }

  /** POST: add a new produto to the server */
  addProduto(produto: Produto): Observable<Produto> {
    return this.http
      .post<Produto>(this.api + '/add', produto, this.httpOptions)
      .pipe(
        tap((novaProduto: Produto) =>
          this.log(`produto adicionado com id=${novaProduto.id}`)
        ),
        catchError(this.handleError<Produto>('addProduto'))
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
