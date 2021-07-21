import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInMarket } from 'src/app/app.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-product-in-market',
  templateUrl: './product-in-market.component.html',
  styleUrls: ['./product-in-market.component.scss'],
})
export class ProductInMarketComponent implements OnInit {
  @Input() item: ProductInMarket;
  @Output() more = new EventEmitter<void>();
  @Output() minus = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  emmitMore() {
    this.more.emit();
  }

  emmitMinus() {
    if (this.item.units === 1) {
      this.emmitDelete();
      return;
    }

    this.minus.emit();
  }

  async emitEdit(slidingItem: IonItemSliding) {
    await slidingItem.close();
    this.edit.emit();
  }

  emmitDelete() {
    this.delete.emit();
  }
}
