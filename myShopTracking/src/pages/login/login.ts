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
        'webClientId': 'AIzaSyBlabEzswLpwtmtR4Wqz8m13Egf-H-hr9E',
        'offline': true
      }).then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        return firebase.auth().signInWithCredential(googleCredential);
      })
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
