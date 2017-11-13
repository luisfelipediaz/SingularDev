import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule, Platform, ModalController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../../app/app.config';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { ShoppingPage } from './shopping';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavControllerMock } from 'ionic-mocks/dist/angular/nav-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AlertControllerMock, NavParamsMock, ModalControllerMock } from 'ionic-mocks';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BarcodeScannerMock } from '@ionic-native-mocks/barcode-scanner';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { CommonProvider } from '../../providers/common/common';
import { MarketServiceProvider } from '../../providers/market-service/market-service';
import { ComponentsModule } from '../../components/components.module';

describe('ShoppingPage', () => {
    let fixture: ComponentFixture<ShoppingPage>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShoppingPage],
            imports: [
                IonicModule.forRoot(ShoppingPage),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFirestoreModule,
                ComponentsModule
            ],
            providers: [
                ProductServiceProvider,
                SupermarketServiceProvider,
                CommonProvider,
                MarketServiceProvider,
                { provide: NavController, useFactory: () => NavControllerMock.instance() },
                { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
                { provide: NavParams, useFactory: () => NavParamsMock.instance() },
                { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
                { provide: BarcodeScanner, useClass: BarcodeScannerMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingPage);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof ShoppingPage).toBe(true);
    });

});