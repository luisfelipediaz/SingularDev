import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Product } from '../../interfaces/product';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class ProductServiceProvider {

  constructor(public http: Http, private afDB: AngularFireDatabase) {
  }

  public getProducts(): FirebaseListObservable<Product[]> {
    return this.afDB.list("/products");    
  }

  public getProduct(id: string, supermarket?: string): FirebaseListObservable<Product[]> {
    return this.afDB.list("/products", {
      query: {
        equalTo: id,
        limitToFirst: 1
      }
    });
  }
  
  public deleteProduct(key: string): void {
    this.afDB.list("/products").remove(key);
  }

  public pushProduct(product: Product): void {
    this.afDB.list("/products").push(product);
  }

}
