import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { NgFor, NgIf } from '@angular/common';

@Component({ selector: 'app-home', standalone: true, imports: [NgFor, NgIf], templateUrl: './home.html' })
export class Home implements OnInit {
  books: Book[] = [];

  get total() { return this.books.length; }
  get totalStock() { return this.books.reduce((s, b) => s + b.stock, 0); }
  get alerts() { return this.books.filter(b => b.stock <= 3).sort((a, b) => a.stock - b.stock); }

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => this.books = res.data);
  }
}