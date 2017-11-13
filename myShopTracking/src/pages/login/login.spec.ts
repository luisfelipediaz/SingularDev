import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../../app/app.config';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { LoginPage } from './login';
import { PlatformMock } from 'ionic-mocks';
import { AngularFireAuth } from 'angularfire2/auth';

describe('LoginPage', () => {
    let fixture: ComponentFixture<LoginPage>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            imports: [
                IonicModule.forRoot(LoginPage),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFirestoreModule
            ],
            providers: [
                SupermarketServiceProvider,
                AngularFireAuth,
                { provide: Platform, useFactory: () => PlatformMock.instance() },
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof LoginPage).toBe(true);
    });

});