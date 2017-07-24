import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { Product } from '../../interfaces/product';

declare var navigator: any;

@Injectable()
export class ProductServiceProvider {
  private isConnected: boolean;

  constructor(public http: Http, private network: Network, private storage: Storage) {
    this.isConnected = navigator.onLine;

    this.network.onConnect().subscribe(() => {
      this.isConnected = true;
    });

    this.network.onDisconnect().subscribe(() => {
      this.isConnected = false;
    });
  }

  public getProducts(): Promise<Product[]> {
    return this.storage.get("products")
      .then(response => response as Product[]);
  }

  public getProduct(id: string, supermarket?: string): Promise<Product> {
    return this.storage.get("products").then(response => {
      return (response as Product[]).find(item => item.id === id && (!supermarket || item.supermarket.brand === supermarket));
    });
  }

  public pushProduct(product: Product): Promise<any> {
    return this.storage.get("products").then(response => {
      let products = ((response as Product[]) || []);
      let productExist = products.find(item => item.id === product.id && item.supermarket.brand === product.supermarket.brand);
      if (!productExist) {
        products.push(product);
      } else {
        productExist.price = product.price;
        productExist.title = product.title;
        productExist.supermarket = product.supermarket;
      }

      return this.storage.set("products", products);
    })
  }

}
