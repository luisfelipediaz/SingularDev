import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { Supermarket } from '../../app.model';

const supermarketFeature = (state: State) => state.market;

export const getCurrentSupermarket = createSelector(supermarketFeature, state => state.current || {} as Supermarket);
export const getCurrentSupermarketId = createSelector(getCurrentSupermarket, state => state.id);

export const getCurrentMarket = createSelector(
    supermarketFeature,
    getCurrentSupermarketId,
    (state, supermarket) => state.markets[supermarket] || {}
);

export const getProducts = createSelector(
    getCurrentMarket,
    state => Object.values(state)
);

export const isEmpty = createSelector(
    getProducts,
    state => state.length === 0
);

export const getTotal = createSelector(
    getProducts,
    state => state.reduce((prev, actual) => prev + actual.total, 0)
);
