import { Component } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public afAuth: AngularFireAuth) {
  }

  loginUserGoogle(): void {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginUserFacebook(): void {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }
}
