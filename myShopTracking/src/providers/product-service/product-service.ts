import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Product } from '../../interfaces/product';
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { ProductSupermarket } from '../../interfaces/product-supermarket';

@Injectable()
export class ProductServiceProvider {

  constructor(public http: Http, private afFS: AngularFirestore) {

  }

  public getProducts(): Observable<Product[]> {
    return this.afFS.collection<Product>('/products').valueChanges();
  }

  public getProductsBySupermarket(top: number, supermarket: string): Observable<Product[]> {
    return this.afFS.collection<Product>(`/products`, ref => {
      return ref
        .orderBy(`supermarkets`)
        .limit(top)
        .startAt(supermarket);
    }).valueChanges();
  }

  public getProduct(id: string): Observable<Product> {
    return this.afFS.doc<Product>(`/products/${id}`).valueChanges();
  }

  public pushProduct(product: Product): void {
    const productDoc = this.afFS.doc<Product>(`/products/${product.id}`);

    productDoc.set({
      id: product.id,
      name: product.name,
      brand: product.brand
    });
  }

  public updatePrice(product: Product, supermarket: string) {
    const supermarketsCollection = this.afFS.collection<ProductSupermarket>(`/products/${product.id}/supermarkets`);
    supermarketsCollection.doc(supermarket).set(product.supermarkets[supermarket]);
  }

  public getPrice(id: string, supermarket: string): Observable<ProductSupermarket> {
    return this.afFS.doc<{ price: number }>(`/products/${id}/supermarkets/${supermarket}`).valueChanges();
  }

  public getLowerPrices(id: string, price: number): Observable<ProductSupermarket[]> {
    return this.afFS.collection<ProductSupermarket>(`/products/${id}/supermarkets`, ref => {
      return ref.where("price", "<", price);
    }).snapshotChanges().map(prices => {
      return prices.map(price => {
        return {
          id: price.payload.doc.id,
          price: price.payload.doc.data().price
        }
      });
    })
  }
}
