import { Component, Output, EventEmitter } from '@angular/core';

import {Supermarket} from '../../interfaces/supermarket';
import {SupermarketServiceProvider} from '../../providers/supermarket-service/supermarket-service';
/**
 * Generated class for the SupermarketListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'supermarket-list',
  templateUrl: 'supermarket-list.html'
})
export class SupermarketListComponent {
  private supermarketList:Supermarket[];
  constructor(private supermarketServiceProvider: SupermarketServiceProvider) { 

  }
  @Output()
  //public productChangeCount: EventEmitter<any> = new EventEmitter();
  public selectSupermarket: EventEmitter<Supermarket> = new EventEmitter();

  ngOnInit(): void{
    this.supermarketServiceProvider.getSupermarket().then(result=>{
      this.supermarketList = result;
    });
  }

  marketSelect(select: Supermarket):void{
    this.selectSupermarket.emit(select);
  }
  
}
