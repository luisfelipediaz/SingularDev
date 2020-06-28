import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { Supermarket } from '../../app.model';

const supermarketFeature = (state: State) => state.supermarket;

const getEntities = createSelector(
    supermarketFeature,
    state => state.entities
);

const getIds = createSelector(
    supermarketFeature,
    state => state.ids
);

const getAllToList = createSelector(
    getEntities,
    getIds,
    (entities, ids) => !!entities ? ids.map(id => entities[id]) : []
);

export const getSupermarketsByBrand = createSelector(
    getAllToList,
    state => state.reduce((prev, supermarket) => {
        prev[supermarket.brand.trim()] = prev[supermarket.brand.trim()] || [];
        prev[supermarket.brand.trim()].push(supermarket);
        return prev;
    }, { } as { [brand: string]: Supermarket[] })
);
