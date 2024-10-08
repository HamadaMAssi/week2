import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { Country } from '../../shared/models/country.model';
import { CountryService } from '../../shared/services/country.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DropdownComponent,
    SearchComponent,
    CardComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchValue = '';
  regionFilter = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  async getCountries(): Promise<void> {
    this.countries = await this.countryService.getCountriesAsync();
    this.applyFilter();
  }

  async getCountriesByName(): Promise<void> {
    if(this.searchValue){
      this.countries = await this.countryService.getCountryByNameAsync(this.searchValue);
    }else{
      await this.getCountries();
    }
    this.applyFilter();
  }

  searchByApi(): void {
      this.getCountriesByName();
  }

  handleSearchChange(input: string): void {
    this.searchValue = input;
    this.searchByApi();
  }

  handleFilterChange(region: string): void {
    this.regionFilter = region;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredCountries = this.regionFilter
      ? this.countries?.filter((country) =>
          country.region?.includes(this.regionFilter)
        )
      : [...this.countries];
  }
}
