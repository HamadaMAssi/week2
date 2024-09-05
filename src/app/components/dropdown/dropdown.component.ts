import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  @Output() filterValue = new EventEmitter<string>();
  selectedRegion = '';

  changeRegion(region: string){
    this.selectedRegion = region;
    this.filterValue.emit(region);
  }

}
