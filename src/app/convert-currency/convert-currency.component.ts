import { Component } from '@angular/core';

import { ExchangeRateService } from '../exchange-rate.service';
import { Currency } from '../currency';

@Component({
  selector: 'app-convert-currency',
  templateUrl: './convert-currency.component.html',
  styleUrls: ['./convert-currency.component.css'],
})
export class ConvertCurrencyComponent {
  ngOnInit() {
    this.exchangeRateService.getCurrency().then(() => {
      this.getCurrenciesForOptions();
      this.addUAH();
      this.selectedCurrency1 = this.currenciesForOptions[0].cc;
      this.selectedCurrency2 =
        this.currenciesForOptions[this.currenciesForOptions.length - 1].cc;
      this.updateCurrencyOptions();
      this.getExchangeRate1(this.selectedCurrency1, this.selectedCurrency2);
    });
  }

  currenciesCodesForCompare: string[] = ['USD', 'EUR'];

  addUAH(): void {
    const UAH: Currency = {
      cc: 'UAH',
      rate: '1',
    };
    this.currenciesForOptions.push(UAH);
  }

  currenciesForOptions: Currency[] = [];
  availableCurrencyOptions: Currency[] = [];
  selectedCurrency1!: string;
  selectedCurrency2!: string;

  getCurrenciesForOptions(): void {
    this.currenciesForOptions =
      this.exchangeRateService.getCurrenciesForCompare(
        this.currenciesCodesForCompare
      );
  }

  updateCurrencyOptions(): void {
    this.availableCurrencyOptions = this.currenciesForOptions.filter(
      (currency) => currency.cc !== this.selectedCurrency1
    );
  }

  exchangeValue1: number = 100;
  exchangeValue2: number = 0;

  getExchangeRate1(currencyForExchange1: string, currencyForExchange2: string) {
    const rate1 = this.currenciesForOptions.find(
      (currency) => currency.cc === currencyForExchange1
    );
    const rate2 = this.currenciesForOptions.find(
      (currency) => currency.cc === currencyForExchange2
    );
    const result: number =
      (this.exchangeValue1 * Number(rate1!.rate)) / Number(rate2!.rate);
    this.exchangeValue2 = Number(result.toFixed(2));
  }

  getExchangeRate2(currencyForExchange1: string, currencyForExchange2: string) {
    const rate1 = this.currenciesForOptions.find(
      (currency) => currency.cc === currencyForExchange1
    );
    const rate2 = this.currenciesForOptions.find(
      (currency) => currency.cc === currencyForExchange2
    );
    const result: number =
      (this.exchangeValue2 * Number(rate2!.rate)) / Number(rate1!.rate);
    this.exchangeValue1 = Number(result.toFixed(2));
  }

  constructor(private exchangeRateService: ExchangeRateService) {}
}
