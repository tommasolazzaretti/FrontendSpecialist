import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Book} from '../../../model/book';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCardComponent implements OnInit {

  @Input() item: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
