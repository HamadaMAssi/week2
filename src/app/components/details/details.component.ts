import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  country: any;

  flagSvg = '';
  flagAlt = '';
  name = '';
  nativeName = '';
  population = 0;
  region = '';
  subregion = '';
  capital = '';
  domain = '';
  currencies = '';
  languages = '';
  borders = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const countryName = params.get('name');
      if (countryName) {
        this.fetchCountryDetails(countryName);
      }
    });
  }

  fetchCountryDetails(name: string) {
    const apiUrl = `https://restcountries.com/v3.1/name/${name}`;
    this.http.get<any>(apiUrl).subscribe({
      next: ([response]) => this.setCountryDetails(response),
      error: (error) => {
        console.error('Error fetching country details:', error);
      },
    });
  }

  private setCountryDetails(country: any): void {
    if (!country) return;

    this.country = country;
    this.flagSvg = country.flags?.svg ?? '';
    this.flagAlt = country.flags?.alt ?? '';
    this.name = country.name?.common ?? 'Unknown Country';
    this.nativeName = this.getNativeName(country);
    this.population = country.population ?? 0;
    this.region = country.region ?? '';
    this.subregion = country.subregion ?? '';
    this.capital = country.capital?.[0] ?? '';
    this.domain = country.tld?.[0] ?? '';
    this.currencies = this.getCurrencies(country);
    this.languages = this.getLanguages(country);
    this.borders = country.borders ?? '';
  }

  private getNativeName(country: any): string {
    const nativeNames = country.name?.nativeName;
    return nativeNames
      ? nativeNames[Object.keys(nativeNames)[0]]?.official ?? ''
      : '';
  }

  private getCurrencies(country: any): string {
    return country.currencies
      ? Object.values(country.currencies)
          .map((c: any) => c.name)
          .join(', ')
      : '';
  }

  private getLanguages(country: any): string {
    return country.languages ? Object.values(country.languages).join(', ') : '';
  }

  goBack() {
    this.location.back();
  }
}
