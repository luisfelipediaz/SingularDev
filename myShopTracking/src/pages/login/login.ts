import { Component } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase/app';
import { Platform, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public afAuth: AngularFireAuth,
    public platform: Platform) {
  }

  loginUserGoogle(): void {
    this.login(new firebase.auth.GoogleAuthProvider());
  }

  loginUserFacebook(): void {
    this.login(new firebase.auth.FacebookAuthProvider());
  }

  private login(provider: firebase.auth.AuthProvider): void {
    if (this.platform.is('cordova') && !this.platform.is('core'))
      this.afAuth.auth.signInWithRedirect(provider).catch((error) => {
        console.log(error);
      });
    else
      this.afAuth.auth.signInWithPopup(provider).catch((error) => {
        console.log(error);
      });
  }
}
