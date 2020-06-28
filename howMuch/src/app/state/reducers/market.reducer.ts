import { createReducer, on, Action } from '@ngrx/store';
import { ProductInMarket, Supermarket } from 'src/app/app.model';

import * as actions from '../actions/market.actions';

export interface MarketState {
    markets: { [market: string]: { [product: string]: ProductInMarket } };
    current: Supermarket;
}

export const initialState: MarketState = {
    markets: {},
    current: null
};

const marketReducer = createReducer(initialState,
    on(actions.changeSupermarket, (state, { supermarket }) => ({
        ...state,
        markets: {
            ...state.markets,
            [supermarket.id]: state.markets[supermarket.id] || {}
        },
        current: supermarket
    })),
    on(actions.addProduct, (state, { product }) => ({
        ...state,
        markets: {
            ...state.markets,
            [state.current.id]: {
                ...state[state.current.id],
                [product.id]: {
                    ...product,
                    units: getUnits(state, product),
                    total: getTotal(state, product)
                }
            }
        }
    }))
);

function getTotal(state: MarketState, product: ProductInMarket) {
    return product.price * getUnits(state, product);
}

function getUnits(state: MarketState, product: ProductInMarket) {
    return (state.markets[state.current.id][product.id] || product).units;
}

export function reducer(state: MarketState, action: Action) {
    return marketReducer(state, action);
}
