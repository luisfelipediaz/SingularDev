import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Supermarket } from "../../interfaces/supermarket";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SupermarketServiceProvider {

  constructor(public http: Http, private afFS: AngularFirestore) {
  }

  public getSupermarkets(batch?: number, lastName?: string): Observable<any> {
    return this.afFS.collection(`/supermarkets`, ref => {
      let query = ref.orderBy("name");

      if (!!lastName) query = query.startAt(lastName);

      query = query.limit(batch);

      return query;
    }).valueChanges();
  }

  public getSupermarket(key: string): Observable<Supermarket> {
    return this.afFS.doc<Supermarket>(`/supermarkets/${key}`).valueChanges();
  }

  public getSupermarketsByKeys(keys: string[]): Observable<Supermarket[]> {
    return this.afFS.collection<Supermarket>(`/supermarkets`, ref => {
      let query = ref.orderBy("id");
      keys.forEach(key => {
        query = query.where("id", "==", key);
      })
      return query;
    }).valueChanges();
  }

  // public getSupermarketName(key: string): Observable<string> {
  //   return this.afFS.doc<string>(`/supermarkets/${key}/name`).valueChanges();
  // }

  public getSupermarketBrands(): Observable<any> {
    return this.afFS.collection(`/supermarketbrands`).valueChanges();
  }

  public pushSupermarket(supermarket: Supermarket) {
    supermarket.id = this.afFS.createId();
    this.afFS.doc(`/supermarkets/${supermarket.id}`).set(supermarket);
  }
}