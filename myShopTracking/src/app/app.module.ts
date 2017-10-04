import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Push } from '@ionic-native/push'
import { Autostart } from '@ionic-native/autostart'

import { AppConfig } from "./app.config";

import { MyApp } from './app.component';

import { SupermarketCardComponent } from '../components/supermarket-card/supermarket-card';

import { MessagingService } from "../providers/messagin/messagin-service";
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { SupermarketServiceProvider } from '../providers/supermarket-service/supermarket-service';
import { CommonProvider } from '../providers/common/common';
import { MarketServiceProvider } from '../providers/market-service/market-service';

@NgModule({
  declarations: [
    MyApp,
    SupermarketCardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(AppConfig.firebaseConfig),
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    BarcodeScanner,
    Push,
    StatusBar,
    SplashScreen,
    Autostart,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductServiceProvider,
    SupermarketServiceProvider,
    MessagingService,
    CommonProvider,
    MarketServiceProvider
  ]
})
export class AppModule { }
