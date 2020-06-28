import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent implements OnInit {
  @Input() productBarcode: string;

  register: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.register = this.fb.group({
      id: [this.productBarcode, [Validators.required]],
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }

  save() {
    this.modalController.dismiss(this.register.value);
  }

}
