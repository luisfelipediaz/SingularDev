import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/app.model';

export const ChangeSupermarket = createAction(
    '[Market] Change supermarket',
    props<{ supermarket: string }>()
);

export const AddProduct = createAction(
    '[Market] Add product',
    props<{ product: Product }>()
);

export const DeleteProduct = createAction(
    '[Market] Delete product',
    props<{ product: string }>()
);

export const IncreaseQuantityProduct = createAction(
    '[Market] Increase quantity product',
    props<{ product: string }>()
);

export const DecreaseQuantityProduct = createAction(
    '[Market] Decrease quantity product',
    props<{ product: string }>()
);
