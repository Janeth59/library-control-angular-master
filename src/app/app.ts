import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Form } from './components/form/form';
import { Table } from './components/table/table';
import { Book } from './models/book.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedBook?: Book;

  selectBookForEdit(book: Book): void {
    this.selectedBook = { ...book };
  }
}
