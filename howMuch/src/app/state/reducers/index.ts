import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as market from './market.reducer';
import * as supermarket from './supermarket.reducer';

export interface State {
  market: market.MarketState;
  supermarket: supermarket.SupermarketState;
}

export const reducers: ActionReducerMap<State> = {
  market: market.reducer,
  supermarket: supermarket.reducer
};

export const metaReducers: MetaReducer<State>[] = environment.production && [] || [];
