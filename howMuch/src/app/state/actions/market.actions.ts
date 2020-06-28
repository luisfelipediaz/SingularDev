// tslint:disable: max-line-length
import { createAction, props } from '@ngrx/store';
import { Product, Supermarket, ProductInMarket } from 'src/app/app.model';

export const changeSupermarket = createAction('[Market] Change supermarket', props<{ supermarket: Supermarket }>());
export const preAddProduct = createAction('[Market] Pre add Product', props<{ product: string }>());
export const addProduct = createAction('[Market] Add product', props<{ product: ProductInMarket }>());
export const deleteProduct = createAction('[Market] Delete product', props<{ product: string }>());
export const increaseQuantityProduct = createAction('[Market] Increase quantity product', props<{ product: string }>());
export const decreaseQuantityProduct = createAction('[Market] Decrease quantity product', props<{ product: string }>());
export const registerNewProduct = createAction('[Market] register new product', props<{ product: Partial<Product>, supermarket: string }>());
