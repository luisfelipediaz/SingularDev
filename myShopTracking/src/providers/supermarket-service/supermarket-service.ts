import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Supermarket } from "../../interfaces/supermarket";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class SupermarketServiceProvider {

  constructor(public http: Http, private afDB: AngularFireDatabase) {
  }

  public getSupermarket(): FirebaseListObservable<Supermarket[]> {
    return this.afDB.list("/supermarkets");
  }

<<<<<<< HEAD
  public pushSupermarket(supermarket:Supermarket):void{
    var supermarketKey = this.afDB.list(`/supermarkets`).push(supermarket).key;
    this.afDB.object(`/supermarkets/${supermarketKey}`).update({
      id: supermarketKey
    })
=======
  public pushSupermarket(supermarket: Supermarket) {
    this.afDB.object(`/supermarkets/${supermarket.id}`).set(supermarket);
>>>>>>> a5e31c8ebd28d59565c5c2a3891f87972f0545b1
  }

}