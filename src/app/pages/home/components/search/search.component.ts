import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  inputValue = '';
  @Output() searchValue = new EventEmitter<string>();

  inputSubject = new Subject<string>();

  constructor(){
    this.inputSubject.pipe(debounceTime(300)).subscribe(value => {
      this.searchValue.emit(value);
    })
  }

  sendValue() {
    this.inputSubject.next(this.inputValue);
  }
}
