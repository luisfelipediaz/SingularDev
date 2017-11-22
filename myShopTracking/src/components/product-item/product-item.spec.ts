import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { ProductItemComponent } from './product-item';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavControllerMock } from 'ionic-mocks';

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
          { provide: NavController, useFactory: () => NavControllerMock.instance() }
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