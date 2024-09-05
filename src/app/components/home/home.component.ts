import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { InputWithIconComponent } from '../input-with-icon/input-with-icon.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DropdownComponent,
    InputWithIconComponent,
    CardComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchValue = '';
  regionFilter = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (data) => {
        this.countries = data;
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  getCountriesByName(): void {
    this.http
      .get<any[]>(`https://restcountries.com/v3.1/name/${this.searchValue}`)
      .subscribe(
        (data) => {
          this.countries = data;
          this.applyFilter();
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
  }

  searchByApi(): void {
    if (!this.searchValue) {
      this.getCountries();
    } else {
      this.getCountriesByName();
    }
  }
  handleSearchChange(input: string) {
    this.searchValue = input;
    this.searchByApi();
  }

  handleFilterChange(region: string) {
    this.regionFilter = region;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredCountries = this.regionFilter
      ? this.countries?.filter((country) =>
          country.region?.includes(this.regionFilter)
        )
      : [...this.countries];
  }
}
