import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductItemComponent } from './product-item';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavMock } from '../../../test-config/mocks-ionic';

describe('ProductItem Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [
        IonicModule.forRoot(ProductItemComponent)
      ],
      providers: [
          { provide: NavController, useClasee: NavMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ProductItemComponent).toBe(true);
  });

});