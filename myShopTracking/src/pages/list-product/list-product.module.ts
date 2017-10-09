import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProductPage } from './list-product';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
    declarations: [
        ListProductPage
    ],
    imports: [
        IonicPageModule.forChild(ListProductPage),
        ComponentsModule
    ],
})
export class ListProductPageModule { }
