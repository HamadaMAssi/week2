import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../shared/models/country.model';
import { CountryService } from '../../shared/services/country.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  countryName: string = '';
  country: Country | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.countryName = params.get('name') || '';
      if (this.countryName) {
        this.fetchCountryDetails();
      }
    });
  }

  async fetchCountryDetails(): Promise<void> {
    this.country = (
      await this.countryService.getCountryByNameAsync(this.countryName)
    )[0];
  }

  getNativeName(): string {
    const nativeNames = this.country?.name?.nativeName;
    return nativeNames
      ? nativeNames[Object.keys(nativeNames)[0]]?.official ?? ''
      : '';
  }

  getCurrencies(): string {
    return this.country?.currencies
      ? Object.values(this.country.currencies)
          .map((c: any) => c.name)
          .join(', ')
      : '';
  }

  getLanguages(): string {
    return this.country?.languages
      ? Object.values(this.country.languages).join(', ')
      : '';
  }

  goBack() {
    this.location.back();
  }
}
