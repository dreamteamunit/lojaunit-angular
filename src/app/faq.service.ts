import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Faq } from './faq';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class FaqService {
    //private api = 'https://lojaunitspring.herokuapp.com/faq/all';
    private api = 'https://lojaunitspring.herokuapp.com/faq';
  
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

    getFaq(): Observable<Faq[]> {
      return this.http.get<Faq[]>(this.api + '/all').pipe(
        tap((_) => this.log('Faqs recuperados')),
        catchError(this.handleError<Faq[]>('getDaq', []))
    );
  }

  deleteFaq(faq: Faq | number): Observable<Faq> {
    const id = typeof faq === 'number' ? faq : faq.id;
    const url = `${this.api}/delete/${id}`;

    return this.http.delete<Faq>(url, this.httpOptions).pipe(
      tap((_) => this.log(`faq deletado id=${id}`)),
      catchError(this.handleError<Faq>('deleteFaq'))
    );
  }

  /** POST: add a new fa to the server */
  addFaq(faq: Faq): Observable<Faq> {
    return this.http
      .post<Faq>(this.api + '/add', faq, this.httpOptions)
      .pipe(
        tap((novoFaq: Faq) =>
          this.log(`faq adicionado com id=${novoFaq.id}`)
        ),
        catchError(this.handleError<Faq>('addFaq'))
      );
  }

  getFaqById(id: number): Observable<Faq> {
    const url = `${this.api}/find/${id}`;
    return this.http.get<Faq>(url).pipe(
      tap((_) => this.log(`daq recuperada id=${id}`)),
      catchError(this.handleError<Faq>(`getFaq id=${id}`))
    );
  }

  updateFaq(faq: Faq): Observable<any> {
    return this.http
      .put(`${this.api}/update/${faq.id}`, faq, this.httpOptions)
      .pipe(
        tap((_) => this.log(`faq atualizada id=${faq.id}`)),
        catchError(this.handleError<any>('updateFaq'))
      );
  }
  searchFaq(term: string): Observable<Faq> {
    if (!term.trim()) {
      // if not search term, return empty marc array.
      return of(null);
    }
    return this.http.get<Faq>(`${this.api}/find/${term}`).pipe(
      tap((x) => {
        //console.log(x);
        x != null
          ? this.log(`faq retornada "${x.id}"`)
          : this.log(`faq nao encontrada "${term}"`);
      }),
      catchError(this.handleError<Faq>('searchFaq', null))
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
    this.messageService.add(`FaqService: ${message}`);
  }
}
