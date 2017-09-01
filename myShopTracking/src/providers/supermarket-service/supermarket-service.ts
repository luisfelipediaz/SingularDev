import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Supermarket } from "../../interfaces/supermarket";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class SupermarketServiceProvider {

  constructor(public http: Http, private afDB: AngularFireDatabase) {
  }

  public getSupermarket(brand?: string): FirebaseListObservable<Supermarket[]> {
    return this.afDB.list(`/supermarkets`, {
      query: {
        orderByChild: 'brand',
        equalTo: brand
      }
    });
  }

  public getSupermarketByProduct(product?: string): FirebaseListObservable<Supermarket[]> {
    return this.afDB.list(`/supermarkets`, {
      query: {
        orderByChild: 'products/'+product,
        equalTo: true
      }
    });
  }

  public getSupermarketBrands(): FirebaseListObservable<any> {
    return this.afDB.list(`/supermarketbrands`);
  }

  public pushSupermarket(supermarket: Supermarket): void {
    this.afDB.list(`/supermarkets`).push(supermarket).key;
    this.afDB.object(`/supermarketbrands/${supermarket.brand}`).set(true);
  }

}