import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
import { ListProductPage } from '../pages/list-product/list-product';
import { ShoppingPage } from '../pages/shopping/shopping';
import { SupermarketPage } from '../pages/supermarket/supermarket';
import { LoginPage } from "../pages/login/login";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;
  user: firebase.User;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      { title: 'Shopping', component: ShoppingPage },
      { title: 'ListProduct', component: ListProductPage },
      { title: 'Supermarket', component: SupermarketPage }
    ];

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        this.rootPage = LoginPage;
        return;
      }
      this.user = user;
      this.rootPage = ShoppingPage;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


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
