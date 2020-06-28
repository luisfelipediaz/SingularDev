import { createReducer, on, Action } from '@ngrx/store';
import { ProductInMarket, Supermarket } from 'src/app/app.model';

import * as actions from '../actions/market.actions';

export interface MarketState {
    markets: { [product: string]: ProductInMarket };
    current: Supermarket;
}

export const initialState: MarketState = {
    markets: {},
    current: null
};

const marketReducer = createReducer(initialState,
    on(actions.changeSupermarket, (state, { supermarket }) => changeSupermarket(state, supermarket)),
    on(actions.addProduct, (state, { product }) => addProduct(state, product)),
    on(actions.increaseQuantityProduct, (state, { product }) => increaseQuantityProduct(state, product)),
    on(actions.decreaseQuantityProduct, (state, { product }) => decreaseQuantityProduct(state, product)),
    on(actions.deleteProduct, (state, { product }) => deleteProduct(state, product))
);

function changeSupermarket(state: MarketState, supermarket: Supermarket): MarketState {
    return ({ ...state, current: supermarket });
}

function addProduct(state: MarketState, product: ProductInMarket): MarketState {
    return ({
        ...state,
        markets: {
            ...state.markets,
            [product.id]: {
                ...product,
                units: getUnits(state, product),
                total: getTotal(state, product)
            }
        }
    });
}

function increaseQuantityProduct(state: MarketState, product: string): MarketState {
    return ({
        ...state,
        markets: {
            ...state.markets,
            [product]: {
                ...state.markets[product],
                units: state.markets[product].units + 1,
                total: (state.markets[product].units + 1) * state.markets[product].price,
            }
        }
    });
}

function decreaseQuantityProduct(state: MarketState, product: string): MarketState {
    return ({
        ...state,
        markets: {
            ...state.markets,
            [product]: {
                ...state.markets[product],
                units: state.markets[product].units - 1,
                total: (state.markets[product].units - 1) * state.markets[product].price,
            }
        }
    });
}

function deleteProduct(state: MarketState, product: string) {
    const currentMarket = { ...state.markets };
    delete currentMarket[product];

    return { ...state, markets: { ...currentMarket } };
}

function getTotal(state: MarketState, product: ProductInMarket) {
    return product.price * getUnits(state, product);
}

function getUnits(state: MarketState, product: ProductInMarket) {
    return (state.markets[product.id] || product).units;
}

export function reducer(state: MarketState, action: Action) {
    return marketReducer(state, action);
}
