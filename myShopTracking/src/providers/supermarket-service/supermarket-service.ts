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

  public pushSupermarket(supermarket: Supermarket) {
    this.afDB.object(`/supermarkets/${supermarket.id}`).set(supermarket);
  }

}