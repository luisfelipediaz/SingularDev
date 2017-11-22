import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule, ViewController } from 'ionic-angular';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../../app/app.config';
import { ListSupermarketPage } from './list-supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { ViewControllerMock } from 'ionic-mocks/dist/angular/view-controller';

describe('ListSupermarketPage', () => {
    let fixture: ComponentFixture<ListSupermarketPage>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListSupermarketPage],
            imports: [
                IonicModule.forRoot(ListSupermarketPage),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFirestoreModule
            ],
            providers: [
                SupermarketServiceProvider,
                { provide: ViewController, useFactory: () => ViewControllerMock.instance() }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListSupermarketPage);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof ListSupermarketPage).toBe(true);
    });

});