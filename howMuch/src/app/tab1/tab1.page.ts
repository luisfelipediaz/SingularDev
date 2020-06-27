import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private barcodeScanner: BarcodeScanner) { }

  async hagalePs() {
    const result = await this.barcodeScanner.scan({ orientation: 'portrait', showTorchButton: true });
    if (result.cancelled) { alert('No sea loca'); }
    alert(`Funiona catre ${result.text}`);
  }

}
