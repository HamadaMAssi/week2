import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { InputWithIconComponent } from '../input-with-icon/input-with-icon.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DropdownComponent, InputWithIconComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  countries: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (response) => {
        this.countries = [...response];
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
}
