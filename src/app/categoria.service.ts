import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from './categoria';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  //private api = 'https://lojaunitspring.herokuapp.com/categoria/all';
  private api = 'https://lojaunitspring.herokuapp.com/categoria';

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

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.api + '/all').pipe(
      tap((_) => this.log('categorias recuperadas')),
      catchError(this.handleError<Categoria[]>('getCategoria', []))
    );
  }

  deleteCategoria(categoria: Categoria | number): Observable<Categoria> {
    const id = typeof categoria === 'number' ? categoria : categoria.id;
    const url = `${this.api}/delete/${id}`;

    return this.http.delete<Categoria>(url, this.httpOptions).pipe(
      tap((_) => this.log(`categoria deletada id=${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }
  
  /** POST: add a new categoria to the server */
  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post<Categoria>(this.api + '/add', categoria, this.httpOptions)
      .pipe(
        tap((novaCategoria: Categoria) =>
          this.log(`categoria adicionada com id=${novaCategoria.id}`)
        ),
        catchError(this.handleError<Categoria>('addCategoria'))
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
    this.messageService.add(`CategoriaService: ${message}`);
  }
}
