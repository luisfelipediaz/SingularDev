import { createReducer, on } from '@ngrx/store';
import { ProductInMarket } from 'src/app/app.model';

import * as actions from '../actions/market.actions';

export interface MarketState {
    markets: { [market: string]: { [product: string]: ProductInMarket } };
    current: string;
}

export const initialState: MarketState = {
    markets: {},
    current: ''
};

const reducer = createReducer(initialState,
    on(actions.ChangeSupermarket, (state, { supermarket }) => ({
        ...state,
        [supermarket]: state[supermarket] || [],
        current: supermarket
    })),
    on(actions.AddProduct, (state, { product }) => ({
        ...state,
        [state.current]: {
            ...state[state.current],
            [product.id]: {
                ...state[state.current][product.id] || { ...product },
                units: state[state.current][product.id].units + 1,
                total: state[state.current][product.id].units * state[state.current][product.id].price
            }
        }
    }))
);

export function marketReducer(state, action) {
    return reducer(state, action);
}
