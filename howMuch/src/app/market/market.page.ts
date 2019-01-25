import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Market } from '../model/market';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  market$: Observable<Market> = new Observable<Market>();

  constructor(
  ) { }

  ngOnInit() {

  }

}
