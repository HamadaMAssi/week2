import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-with-icon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-with-icon.component.html',
  styleUrl: './input-with-icon.component.css',
})
export class InputWithIconComponent {
  inputValue = '';
  @Output() searchValue = new EventEmitter<string>();

  sendValue() {
    this.searchValue.emit(this.inputValue);
  }
}
