import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subject } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model'; 

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit, OnChanges, OnDestroy {
  bookForm!: FormGroup;
  isEditingMode = false;
  editingBookSerie?: number;

  @Input() editBook?: Book;

  //para que actualice y filtre asi ya me detecta los cmabios
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      book_serie: [null, [Validators.required, Validators.min(1)]],
      title:       ['', Validators.required],
      author:      ['', Validators.required],
      public_date: ['', Validators.required],
      gender:      ['', Validators.required],
      stock:       [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editBook'] && this.editBook) {
      this.loadForEdit(this.editBook);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  //actualizar

  loadForEdit(book: Book): void {
    this.isEditingMode = true;
    this.editingBookSerie = book.book_serie;
    this.bookForm.patchValue(book);
    // Bloquear
    this.bookForm.get('book_serie')?.disable();
  }

  cancelEdit(): void {
    this.isEditingMode = false;
    this.editingBookSerie = undefined;
    this.bookForm.reset();
    this.bookForm.get('book_serie')?.enable();
  }

  onSubmit(): void { //SUBSCRICPCIONES
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const book: Book = { ...this.bookForm.getRawValue() };

    if (this.isEditingMode && this.editingBookSerie !== undefined) {
      book.book_serie = this.editingBookSerie;
      this.bookService.updateBook(book).subscribe({
        next: () => {
          console.log('Libro actualizado');
          this.cancelEdit();
        },
        error: err => console.error('Error al actualizar:', err)
      });
    } else {
      this.bookService.createBook(book).subscribe({
        next: () => {
          console.log('Libro creado');
          this.bookForm.reset();
        },
        error: err => console.error('Error al crear:', err)
      });
    }
  }

  //verificando que no manden datos nullos
  isInvalid(field: string): boolean {
    const ctrl = this.bookForm.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
}
