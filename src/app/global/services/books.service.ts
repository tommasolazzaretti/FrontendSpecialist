import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Book} from '../../model/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  loadBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/books/${id}`);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }

  addBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>('http://localhost:3000/books', book);
  }
}
