import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth) {
  }

  loginUserGoogle(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginUserFacebook(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());    
  }
}
