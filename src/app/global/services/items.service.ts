import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Book} from '../../model/book';

@Injectable()
export class ItemsService {
  constructor(private http: HttpClient) {
  }

  loadItems(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  getItem(id: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/books/${id}`);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }

  addItem(item: Partial<Book>): Observable<Book> {
    return this.http.post<Book>('http://localhost:3000/books', item);
  }
}
