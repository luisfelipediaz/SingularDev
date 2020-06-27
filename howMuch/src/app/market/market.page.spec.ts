import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarketPage } from './market.page';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../state/reducers';

describe('MarketPage', () => {
  let component: MarketPage;
  let fixture: ComponentFixture<MarketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketPage],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot(reducers, {
          metaReducers
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MarketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
