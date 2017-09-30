import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Autostart } from "@ionic-native/autostart";

import { AngularFireAuth } from "angularfire2/auth";

import { MessagingService } from "../providers/messagin/messagin-service";
import { AppConfig } from './app.config';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private messagingService: MessagingService,
    private autostart: Autostart) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Shopping', component: 'ShoppingPage' },
      { title: 'ListProduct', component: 'ListProductPage' },
      { title: 'Supermarket', component: 'SupermarketPage' },
      { title: 'My List Market', component: 'MyMarketListPage' },
      { title: 'Login', component: 'LoginPage' }
    ];

    this.initializeApp();

    this.rootPage = 'ShoppingPage';

    //EL plugin de dynamic links de cordova aun esta defectuoso
    /*afAuth.authState.subscribe(user => {
      if (!user) {
        AppConfig.user = null;
        this.rootPage = 'LoginPage';

      } else {
        AppConfig.user = user;
        this.rootPage = 'ShoppingPage';
      }
    });*/


  }

  isAuthenticated(): boolean {
    return !!AppConfig.user;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.autostart.enable();
      this.messagingService.init();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
