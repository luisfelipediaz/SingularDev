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
                ...state.markets[state.current.id],
                [product.id]: {
                    ...product,
                    units: getUnits(state, product),
                    total: getTotal(state, product)
                }
            }
        }
    })),
    on(actions.increaseQuantityProduct, (state, { product }) => ({
        ...state,
        markets: {
            ...state.markets,
            [state.current.id]: {
                ...state.markets[state.current.id],
                [product]: {
                    ...state.markets[state.current.id][product],
                    units: state.markets[state.current.id][product].units + 1,
                    total: (state.markets[state.current.id][product].units + 1) * state.markets[state.current.id][product].price,
                }
            }
        }
    })),
    on(actions.decreaseQuantityProduct, (state, { product }) => ({
        ...state,
        markets: {
            ...state.markets,
            [state.current.id]: {
                ...state.markets[state.current.id],
                [product]: {
                    ...state.markets[state.current.id][product],
                    units: state.markets[state.current.id][product].units - 1,
                    total: (state.markets[state.current.id][product].units - 1) * state.markets[state.current.id][product].price,
                }
            }
        }
    })),
    on(actions.deleteProduct, (state, { product }) => {
        const currentMarket = { ...state.markets[state.current.id] };
        delete currentMarket[product];

        return {
            ...state,
            markets: {
                ...state.markets,
                [state.current.id]: {
                    ...currentMarket
                }
            }
        };
    })
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
