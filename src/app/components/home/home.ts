import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => this.books = res.data);
  }

  get total() { return this.books.length; }
  get totalStock() { return this.books.reduce((s, b) => s + b.stock, 0); }
  get alerts() { return this.books.filter(b => b.stock <= 3).sort((a, b) => a.stock - b.stock); }

  getStockClass(stock: number): string {
    if (stock === 0) return 'text-danger fw-bold';
    if (stock <= 5) return 'text-warning fw-bold';
    return 'text-success';
  }
}