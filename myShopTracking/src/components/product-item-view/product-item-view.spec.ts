import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavMock } from '../../../test-config/mocks-ionic';
import { ProductItemViewComponent } from './product-item-view';

describe('ProductItemView Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductItemViewComponent],
            imports: [
                IonicModule.forRoot(ProductItemViewComponent)
            ],
            providers: [
                { provide: NavController, useClasee: NavMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductItemViewComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof ProductItemViewComponent).toBe(true);
    });

});