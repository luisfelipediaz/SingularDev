import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Network } from '@ionic-native/network'

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ShoppingPage } from '../pages/shopping/shopping';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { ListProductPage } from '../pages/list-product/list-product';

import { ProductItemComponent } from '../components/product-item/product-item';
import { ProductItemViewComponent } from '../components/product-item-view/product-item-view';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { GroupByPipe } from '../entities/groupBy.pipe';
import { SupermarketServiceProvider } from '../providers/supermarket-service/supermarket-service';
import { SupermarketCardComponent } from '../components/supermarket-card/supermarket-card';
import { SupermarketListComponent } from '../components/supermarket-list/supermarket-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ShoppingPage,
    EditProductPage,
    ProductItemComponent,
    ProductItemViewComponent,
    ListProductPage,
    GroupByPipe,
    SupermarketCardComponent,
    SupermarketListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    EditProductPage,
    ShoppingPage,
    ListProductPage
  ],
  providers: [
    Network,
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductServiceProvider,
    SupermarketServiceProvider
  ]
})
export class AppModule {}
