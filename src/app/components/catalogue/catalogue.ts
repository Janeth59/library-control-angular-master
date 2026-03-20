import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule, NgIf],
  templateUrl: './catalogue.html',
})
export class Catalogue implements OnInit {
  books: Book[] = [];
  searchQuery = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => this.books = res.data);
  }

  get filtered() {
    const q = this.searchQuery.toLowerCase();
    if (!q) return this.books;
    return this.books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.gender.toLowerCase().includes(q)
    );
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'text-danger fw-bold';
    if (stock <= 5) return 'text-warning fw-bold';
    return 'text-success';
  }
}