import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //private api = 'https://lojaunitspring.herokuapp.com/clientes/all'; // URL to web api
  private api = 'https://lojaunitspring.herokuapp.com/clientes';

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

  getClientes(): Observable<Cliente[]> {console.log('a');
    return this.http.get<Cliente[]>(this.api + '/all').pipe(
      tap((_) => this.log('clientes recuperados')),
      catchError(this.handleError<Cliente[]>('getClientes', []))
    );
  }

  deleteCliente(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente : cliente.id;
    const url = `${this.api}/delete/${id}`;

    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap((_) => this.log(`cliente deletado id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }
  /** POST: add a new cliente to the server */
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.api + '/add', cliente, this.httpOptions)
      .pipe(
        tap((novoCliente: Cliente) =>
          this.log(`cliente adicionado com id=${novoCliente.id}`)
        ),
        catchError(this.handleError<Cliente>('addCliente'))
      );
  }

  //getCliente(id: number): Observable<Cliente> {
    // TODO: send the message _after_ fetching the hero
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(CLIENTES.find((cliente) => cliente.id === id));
  //}
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
    this.messageService.add(`ClienteService: ${message}`);
  }
}
