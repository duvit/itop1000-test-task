import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Currency } from './currency';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  readonly URL =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  exchangeRate: any;

  getCurrencyData(): any {
    return this.http.get<any>(this.URL);
  }

  async getCurrency() {
    try {
      const response = await this.getCurrencyData().toPromise();
      this.exchangeRate = response;
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  }

  getRate(currency: string, dataArray = this.exchangeRate) {
    const result = dataArray.find(
      (currencyObj: Currency) => currencyObj.cc === currency
    );
    return result;
  }

  getCurrenciesForCompare(
    currencies: string[],
    dataArray = this.exchangeRate
  ): Currency[] {
    const result: Currency[] = [];

    for (const currency of currencies) {
      const findedEl = dataArray.find(
        (currencyObj: Currency) => currencyObj.cc === currency
      );

      result.push(findedEl);
    }
    return result;
  }

  constructor(private http: HttpClient) {}
}
