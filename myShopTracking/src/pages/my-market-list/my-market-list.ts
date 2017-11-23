import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { PreProduct } from '../../interfaces/pre-product';
import { MyMarketListServiceProvider } from '../../providers/my-market-list-service/my-market-list-service';

@IonicPage()
@Component({
  selector: 'page-my-market-list',
  templateUrl: 'my-market-list.html',
})
export class MyMarketListPage {
  private preProduct:PreProduct;

  constructor(private myMarketListServiceProvider: MyMarketListServiceProvider) {
  }
  
  /*productSelected(product: string){
    console.log("Select product", product);
  }*/

  add():void{
    this.myMarketListServiceProvider.pushProduct(this.preProduct);
  }

}