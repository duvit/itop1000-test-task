import { Component } from '@angular/core';
import { Currency } from '../currency';

import { ExchangeRateService } from '../exchange-rate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  async ngOnInit() {
    await this.exchangeRateService.getCurrency();
    this.getUSDrate();
    this.getEURrate();
  }

  exchangeRate: Currency[] = [];
  USDrate!: number;
  EURrate!: number;

  getUSDrate() {
    this.USDrate = this.exchangeRateService.getRate('USD').rate;
  }

  getEURrate() {
    this.EURrate = this.exchangeRateService.getRate('EUR').rate;
  }

  constructor(private exchangeRateService: ExchangeRateService) {}

  todayDate = new Date();
}
