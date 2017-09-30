import { Injectable } from '@angular/core';
import { Market } from '../../entities/market';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductMarket } from '../../interfaces/product-market';
import { AppConfig } from '../../app/app.config';

@Injectable()
export class MarketServiceProvider {

  constructor(private afDB: AngularFireDatabase) {
  }

  pushMarket(market: Market) {
    if (!AppConfig.user) return;
    this.afDB.object(`/markets/${AppConfig.user.uid}/${market.date}`).set({
      date: market.date,
      supermarket: market.supermarket ? market.supermarket.$key : null,
      products: market.products
    });
  }

  pushProduct(market: Market, product: ProductMarket) {
    if (!AppConfig.user) return;
    this.afDB.object(`/markets/${AppConfig.user.uid}/${market.date}/products/${product.product.$key}`).update({
      count: product.count,
      price: product.price,
      unitPrice: product.product.supermarkets[market.supermarket.$key]
    });
  }

  updateProduct(market: Market, product: ProductMarket) {
    if (!AppConfig.user) return;    
    this.afDB.object(`/markets/${AppConfig.user.uid}/${market.date}/products/${product.product.$key}`).update({
      count: product.count,
      price: product.price
    });
  }

  deleteProduct(market: Market, product: ProductMarket) {
    if (!AppConfig.user) return;
    this.afDB.object(`/markets/${AppConfig.user.uid}/${market.date}/products/${product.product.$key}`).remove();
  }

}
