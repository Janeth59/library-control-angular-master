import { NgFor, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit, OnDestroy {
  books: Book[] = [];

  @Output() editBookEvent = new EventEmitter<Book>();

  private destroy$ = new Subject<void>();

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBooks();

    // crear suscripcion
    this.bookService.created$.pipe(takeUntil(this.destroy$)).subscribe(book => {
      this.books.push(book);
      this.cdr.detectChanges();
    });

    // sucripcion delete
    this.bookService.deleted$.pipe(takeUntil(this.destroy$)).subscribe(serie => {
      this.books = this.books.filter(b => String(b.book_serie) !== serie);
      this.cdr.detectChanges();
    });

    // update subcripcion
    this.bookService.updated$.pipe(takeUntil(this.destroy$)).subscribe(updated => {
      const idx = this.books.findIndex(b => b.book_serie === updated.book_serie);
      if (idx !== -1) {
        this.books[idx] = updated;
        this.cdr.detectChanges();
      } else {
        this.loadBooks();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //get todos loslibros para la tablas
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: res => {
        this.books = res.data;
        this.cdr.detectChanges();
      },
      error: err => console.error('Error al cargar libros:', err)
    });
  }

  //delete
  removeBook(book_serie: number): void {
    this.bookService.deleteBook(book_serie).subscribe({
      next: () => {
        this.books = this.books.filter(b => b.book_serie !== book_serie);
        this.cdr.detectChanges();
      },
      error: err => console.error('Error al eliminar:', err)
    });
  }

  //update
  editBook(book: Book): void {
    this.editBookEvent.emit(book);
  }

  //obetner nuemro de libros por si las moscas hacen falta pedir mas
  getStockClass(stock: number): string {
    if (stock === 0) return 'text-danger fw-bold';//peligro
    if (stock <= 5) return 'text-warning fw-bold';//aguas faltan mas
    return 'text-success';
  }
}
