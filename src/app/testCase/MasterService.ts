import {Injectable} from '@angular/core';
import {BooksService} from '../global/services/books.service';

@Injectable()
export class MasterService {
  constructor(private valueService: BooksService) { }
  loadBooks() { return this.valueService.loadBooks(); }
}
