import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // onservables
  private _created$ = new Subject<Book>();
  created$ = this._created$.asObservable();

  private _deleted$ = new Subject<string>();
  deleted$ = this._deleted$.asObservable();

  private _updated$ = new Subject<Book>();
  updated$ = this._updated$.asObservable();

  // getall
  getBooks(): Observable<{ data: Book[] }> {
    return this.http.get<{ data: Book[] }>(this.baseUrl + '/getAll');
  }

  // Crear libro
  createBook(book: Book): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.baseUrl + '/insertOne', book, this.httpOptions
    ).pipe(tap(() => this._created$.next(book)));
  }

  // delte libro
  deleteBook(book_serie: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/deleteOne/${book_serie}`, this.httpOptions
    ).pipe(tap(() => this._deleted$.next(String(book_serie))));
  }

  // update libro
  updateBook(book: Book): Observable<{ message: string; data: Book }> {
    return this.http.put<{ message: string; data: Book }>(
      `${this.baseUrl}/updateOne/${book.book_serie}`, book, this.httpOptions
    ).pipe(tap(res => this._updated$.next(res.data ?? book)));
  }
}
