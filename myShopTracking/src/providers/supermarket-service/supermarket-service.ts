import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Supermarket } from "../../interfaces/supermarket";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class SupermarketServiceProvider {

  constructor(public http: Http, private afDB: AngularFireDatabase) {
  }

  public getSupermarket(): FirebaseListObservable<Supermarket[]> {
    return this.afDB.list("/supermarkets");
  }

  public pushSupermarket(supermarket: Supermarket): void {
    var supermarketKey = this.afDB.list(`/supermarkets`).push(supermarket).key;
    supermarket.$key = supermarketKey;
    this.afDB.object(`/supermarketchain/${supermarket.brand}/${supermarketKey}`).set(true);
  }

}