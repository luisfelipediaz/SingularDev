import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from 'src/app/app.model';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent implements OnInit {
  @Input() product: Product;

  register: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.register = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      brand: [null],
      price: [null, [Validators.required]],
      isCustom: [false]
    });

    this.register.patchValue(this.product);
  }

  save() {
    this.modalController.dismiss(this.register.value);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
