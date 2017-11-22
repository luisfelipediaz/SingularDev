import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule, NavController, AlertController } from 'ionic-angular';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../../app/app.config';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { SupermarketPage } from './supermarket';
import { NavControllerMock } from 'ionic-mocks';
import { AlertControllerMock } from 'ionic-mocks/dist/angular/alert-controller';

describe('SupermarketPage', () => {
    let fixture: ComponentFixture<SupermarketPage>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupermarketPage],
            imports: [
                IonicModule.forRoot(SupermarketPage),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFirestoreModule
            ],
            providers: [
                SupermarketServiceProvider,
                { provide: NavController, useFactory: () => NavControllerMock.instance() },
                { provide: AlertController, useFactory: () => AlertControllerMock.instance() }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupermarketPage);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof SupermarketPage).toBe(true);
    });

});