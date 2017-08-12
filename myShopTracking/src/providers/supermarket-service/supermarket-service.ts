import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { Supermarket } from "../../interfaces/supermarket";

declare var navigator: any;

/*
  Generated class for the SupermarketProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SupermarketServiceProvider {
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

  public getSupermarket(): Promise<Supermarket[]>{
    return this.storage.get("shopsupermarket")
      .then(response=>response as Supermarket[]);
  }
    
}
