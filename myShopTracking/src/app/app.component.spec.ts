import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic-native/push';
import { Autostart } from '@ionic-native/autostart';
import { AutostartMock } from '@ionic-native-mocks/autostart';
import { PushMock } from '@ionic-native-mocks/push';
import { MyApp } from './app.component';
import { AppConfig } from './app.config';
import { MessagingService } from '../providers/messagin/messagin-service';
import { StatusBarMock, SplashScreenMock, PlatformMock } from 'ionic-mocks';

describe('MyApp Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [
                IonicModule.forRoot(MyApp),
                AngularFireModule.initializeApp(AppConfig.firebaseConfig),
                AngularFireAuthModule,
                AngularFirestoreModule.enablePersistence()
            ],
            providers: [
                AngularFireAuth,
                MessagingService,
                { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
                { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() },
                { provide: Platform, useFactory: () => PlatformMock.instance() },
                { provide: Push, useClass: PushMock },
                { provide: Autostart, useClass: AutostartMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof MyApp).toBe(true);
    });

    it('should have five pages', () => {
        expect(component.pages.length).toBe(5);
    });

});