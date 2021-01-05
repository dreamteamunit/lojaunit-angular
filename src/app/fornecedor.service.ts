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
    private api = 'https://lojaunitspring.herokuapp.com/fornecedor/all';
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
      ) {}

      getFornecedor(): Observable<Fornecedor[]> {console.log('a');
    return this.http.get<Fornecedor[]>(this.api).pipe(
      tap((_) => this.log('fornecedores recuperados')),
      catchError(this.handleError<Fornecedor[]>('getFornecedor', []))
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
