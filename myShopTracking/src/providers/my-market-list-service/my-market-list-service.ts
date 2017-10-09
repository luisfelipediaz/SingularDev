import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { PreProduct } from '../../interfaces/pre-product';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class MyMarketListServiceProvider {

  constructor(private fs: AngularFirestore) {
  }

  public pushProduct(preProduct:PreProduct):void{
    const preProductDoc = this.fs.doc<PreProduct>(`/preProducts/${preProduct.id}`);

    preProductDoc.set({
      id: preProduct.id,
      name: preProduct.name
    });
  }
}
