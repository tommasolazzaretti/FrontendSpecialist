import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Book} from '../../model/book';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  readonly booksUrl = 'localhost:3000';

  constructor(private http: HttpClient) {
  }

  loadBooks(params?: { title?: string, author?: string }): Observable<Book[]> {
    let uri = 'http://localhost:3000/books?';
    console.log('params   ', params);
    if (params) {
      Object.keys(params).forEach(key => {
        uri = params[key] ? uri.concat(key + '=' + params[key] + '&') : uri;
      });
    }
    return this.http.get<Book[]>(uri);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/books/${id}`);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    console.log(' item save or update ', book);
    if (book.id) {
      return this.http.patch<Book>(`http://localhost:3000/books/${book.id}`, book, httpOptions);
    } else {
      return this.http.post<Book>('http://localhost:3000/books', book, httpOptions);
    }
  }
}

