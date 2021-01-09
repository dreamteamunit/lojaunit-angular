import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fornecedor } from './fornecedor';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
  export class FornecedorService {
    //private api = 'https://lojaunitspring.herokuapp.com/fornecedor/all';
    private api = 'https://lojaunitspring.herokuapp.com/fornecedor';
  
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

    getFornecedor(): Observable<Fornecedor[]> {
      return this.http.get<Fornecedor[]>(this.api + '/all').pipe(
        tap((_) => this.log('fornecedores recuperados')),
        catchError(this.handleError<Fornecedor[]>('getFornecedor', []))
      );
    }

    deleteFornecedor(fornecedor: Fornecedor | number): Observable<Fornecedor> {
      const id = typeof fornecedor === 'number' ? fornecedor : fornecedor.id;
      const url = `${this.api}/delete/${id}`;
  
      return this.http.delete<Fornecedor>(url, this.httpOptions).pipe(
      tap((_) => this.log(`fornecedor deletado id=${id}`)),
      catchError(this.handleError<Fornecedor>('deleteFornecedor'))
      );
    }

    /** POST: add a new Fornecedor to the server */
    addFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
      return this.http
        .post<Fornecedor>(this.api + '/add', fornecedor, this.httpOptions)
        .pipe(
          tap((novoFornecedor: Fornecedor) =>
            this.log(`fornecedor adicionado com id=${novoFornecedor.id}`)
          ),
          catchError(this.handleError<Fornecedor>('addFornecedor'))
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
    this.messageService.add(`FornecedorService: ${message}`);
  }
  
  }
