import { Component } from '@angular/core';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from "@ionic-native/google-plus";

import { Platform } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    private go: GooglePlus) {
  }

  loginUserGoogle(): void {
    if (this.platform.is('cordova')) {
      this.go.login({
        'webClientId': '35947451087-h602pupoqq1m4ak3ssiqdg85k532bge5.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        alert(res);
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential).catch(error => {
          alert(error);
        });
      }).catch(err => {
        alert(err);

      });
    } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

  }

  loginUserFacebook(): void {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

  }
}
