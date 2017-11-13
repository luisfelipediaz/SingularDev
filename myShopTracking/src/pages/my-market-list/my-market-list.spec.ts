import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../../app/app.config';
import { MyMarketListPage } from './my-market-list';
import { MyMarketListServiceProvider } from '../../providers/my-market-list-service/my-market-list-service';

describe('MyMarketPage', () => {
    let fixture: ComponentFixture<MyMarketListPage>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyMarketListPage],
            imports: [
                IonicModule.forRoot(MyMarketListPage),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFirestoreModule
            ],
            providers: [
                MyMarketListServiceProvider
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyMarketListPage);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof MyMarketListPage).toBe(true);
    });

});