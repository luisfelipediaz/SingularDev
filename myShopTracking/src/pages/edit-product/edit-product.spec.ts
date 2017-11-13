import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { EditProductPage } from './edit-product';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { NavControllerMock, NavParamsMock } from 'ionic-mocks';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../../app/app.config';

describe('EditProductPage', () => {
    let fixture: ComponentFixture<EditProductPage>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditProductPage],
            imports: [
                IonicModule.forRoot(EditProductPage),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFirestoreModule
            ],
            providers: [
                ProductServiceProvider,
                { provide: NavParams, useFactory: () => NavParamsMock.instance() },
                { provide: NavController, useFactory: () => NavControllerMock.instance() }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditProductPage);
        component = fixture.componentInstance;
        const navParams: NavParams = fixture.debugElement.injector.get(NavParams);
        navParams.data = {

        }
    });

    it('should be created', () => {
        expect(component instanceof EditProductPage).toBe(true);
    });

});