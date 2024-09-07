import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private http: HttpClient) {}

  async getCountriesAsync(): Promise<Country[]> {
    try {
      return await lastValueFrom(
        this.http.get<Country[]>('https://restcountries.com/v3.1/all')
      );
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }

  async getCountryByNameAsync(name: string): Promise<Country[]> {
    try {
      return await lastValueFrom(
        this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${name}`)
      );
    } catch (error) {
      console.error('Error fetching country:', error);
      return [];
    }
  }
}
