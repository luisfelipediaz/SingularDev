import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

import { MarketPage } from './market.page';
import { Market } from '../model/market';

describe('MarketPage', () => {
  let component: MarketPage;
  let fixture: ComponentFixture<MarketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render as many items as there are products', () => {
    const market: Market = getMarketMock();
    const marketFake$ = new BehaviorSubject<Market>(market);
    component.market$ = marketFake$;
    fixture.detectChanges();

    const products = fixture.debugElement.queryAll(By.css('ion-item'));

    expect(products.length).toBe(2);
  });

  function getMarketMock(): Market {
    return <Market>{
      products: [
        {
          count: 3,
          price: 1000,
          total: 3000,
          product: {
            brand: '',
            id: '',
            name: 'Molipollo'
          }
        },
        {
          count: 5,
          price: 1000.1111,
          total: 5000.5555,
          product: {
            brand: '',
            id: '',
            name: 'Arina para pan'
          }
        }
      ],
      total: 900000
    };
  }
});
