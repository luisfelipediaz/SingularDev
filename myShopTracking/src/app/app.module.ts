import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Push } from '@ionic-native/push'
import { Autostart } from '@ionic-native/autostart'

import { AppConfig } from "./app.config";

import { MyApp } from './app.component';
import { ProductItemComponent } from '../components/product-item/product-item';
import { ProductItemViewComponent } from '../components/product-item-view/product-item-view';
import { SupermarketCardComponent } from '../components/supermarket-card/supermarket-card';

import { EditProductPage } from '../pages/edit-product/edit-product';
import { ListProductPage } from '../pages/list-product/list-product';
import { ListSupermarketPage } from "../pages/list-supermarket/list-supermarket";
import { LoginPage } from "../pages/login/login";
import { ShoppingPage } from '../pages/shopping/shopping';
import { SupermarketPage } from "../pages/supermarket/supermarket";
import { MyMarketListPage } from "../pages/my-market-list/my-market-list";

import { MessagingService } from "../providers/messagin/messagin-service";
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { SupermarketServiceProvider } from '../providers/supermarket-service/supermarket-service';
import { CommonProvider } from '../providers/common/common';
import { MarketServiceProvider } from '../providers/market-service/market-service';

@NgModule({
  declarations: [
    MyApp,
    ShoppingPage,
    EditProductPage,
    ProductItemComponent,
    ProductItemViewComponent,
    ListProductPage,
    SupermarketPage,
    SupermarketCardComponent,
    ListSupermarketPage,
    LoginPage
    LoginPage,
    MyMarketListPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(AppConfig.firebaseConfig),
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditProductPage,
    ShoppingPage,
    ListProductPage,
    SupermarketPage,
    ListSupermarketPage,
    LoginPage
    LoginPage,
    MyMarketListPage
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
