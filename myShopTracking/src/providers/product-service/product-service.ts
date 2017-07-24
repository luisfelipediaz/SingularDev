import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { Product } from '../../interfaces/product';

@Injectable()
export class ProductServiceProvider {
  private isConnected: boolean;

  constructor(public http: Http, private network: Network, private storage: Storage) {
    this.network.onConnect().subscribe(() => {this.isConnected = true; alert("Estas conectado motherfoca"); });
    this.network.onDisconnect().subscribe(() => {this.isConnected = false; alert("Estas desconectado motherfoca")});
    this.createProducts();
  }

  public getProducts(): Promise<Product[]> {
    return this.storage.get("products")
      .then(response => response as Product[]);
  }

  private createProducts(): void {
    this.storage.keys().then(keys => {
      for (var index = 0; index < keys.length; index++) {
        var element = keys[index];
        if (element === "products") {
          return;
        }
      }

      var items: Array<Product> = new Array<Product>();
      items.push({
        id: 1,
        title: "Coca cola",
        price: 6500,
        count: 1,
        unitPrice: 6500
      });

      items.push({
        id: 2,
        title: "Yogourt",
        price: 16020,
        count: 3,
        unitPrice: 5340
      });

      items.push({
        id: 3,
        title: "Pan perro bimbo",
        price: 4305,
        count: 7,
        unitPrice: 615
      });

      items.push({
        id: 4,
        title: "Desodorante",
        price: 1200,
        count: 12,
        unitPrice: 100
      });

      this.storage.set("products", items);
    });

  }

}
