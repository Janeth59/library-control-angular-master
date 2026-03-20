import { Component } from '@angular/core';
import { Form } from '../form/form';
import { Table } from '../table/table';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Form, Table],
  templateUrl: './register.html',
})
export class Register {
  selectedBook?: Book;

  selectBookForEdit(book: Book) {
    this.selectedBook = book;
  }
}