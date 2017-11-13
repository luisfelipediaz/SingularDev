import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../../app/app.config';
import { ComponentsModule } from '../../components/components.module';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { ListProductPage } from './list-product';
import { ProductServiceProvider } from '../../providers/product-service/product-service';

describe('ListProductPage', () => {
    let fixture: ComponentFixture<ListProductPage>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListProductPage],
            imports: [
                IonicModule.forRoot(ListProductPage),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFirestoreModule,
                ComponentsModule
            ],
            providers: [
                SupermarketServiceProvider,
                ProductServiceProvider
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListProductPage);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof ListProductPage).toBe(true);
    });

});