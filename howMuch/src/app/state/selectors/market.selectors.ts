import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { Supermarket } from '../../app.model';

const supermarketFeature = (state: State) => state.market;

export const getCurrentSupermarket = createSelector(supermarketFeature, state => state.current || {} as Supermarket);
export const getCurrentSupermarketId = createSelector(getCurrentSupermarket, state => state.id);
