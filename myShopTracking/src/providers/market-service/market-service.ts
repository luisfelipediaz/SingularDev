import { Injectable } from '@angular/core';
import { Market } from '../../entities/market';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProductMarket } from '../../interfaces/product-market';
import { AppConfig } from '../../app/app.config';

@Injectable()
export class MarketServiceProvider {

  constructor(private afFS: AngularFirestore) {
  }

  pushMarket(market: Market) {
    if (!AppConfig.user) return;
    this.afFS.doc(`/markets/${AppConfig.user.uid}/history/${market.date}`).set({
      date: market.date,
      supermarket: market.supermarket.id
    });
  }

  pushProduct(market: Market, product: ProductMarket) {
    if (!AppConfig.user) return;
    this.afFS.doc(`/markets/${AppConfig.user.uid}/history/${market.date}/products/${product.product.id}`).set({
      count: product.count,
      price: product.price,
      unitPrice: product.product.supermarkets[market.supermarket.id].price
    });
  }

  updateProduct(market: Market, product: ProductMarket) {
    if (!AppConfig.user) return;
    this.afFS.doc(`/markets/${AppConfig.user.uid}/history/${market.date}/products/${product.product.id}`).update({
      count: product.count,
      price: product.price
    });
  }

  deleteProduct(market: Market, product: ProductMarket) {
    if (!AppConfig.user) return;
    this.afFS.doc(`/markets/${AppConfig.user.uid}/history/${market.date}/products/${product.product.id}`).delete();
  }

}
