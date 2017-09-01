import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Product } from '../../interfaces/product';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class ProductServiceProvider {

  constructor(public http: Http, private afDB: AngularFireDatabase) {
  }

  public getProducts(): FirebaseListObservable<Product[]> {
    return this.afDB.list(`/products`);
  }

  public getProductsBySupermarket(supermarket: string): FirebaseListObservable<Product[]> {

    return this.afDB.list(`/products`,
      {
        query: {
          orderByChild: 'supermarkets/' + supermarket,
          startAt: 0
        }
      }
    );
  }

  public getProduct(id: string): FirebaseObjectObservable<Product> {
    return this.afDB.object(`/products/${id}`);
  }

  public deleteProduct(key: string): void {
    this.afDB.list("/products").remove(key);
  }

  public pushProduct(product: Product): void {
    this.afDB.object(`/products/${product.$key}`).update({
      id: product.$key,
      name: product.name,
      brand: product.brand
    });

    for (let supermarket in product.supermarkets) {
      this.afDB.object(`/products/${product.$key}/supermarkets/${supermarket}`).set(product.supermarkets[supermarket]);
      this.afDB.object(`/supermarkets/${supermarket}/products/${product.$key}`).set(true);
    }
  }

}
