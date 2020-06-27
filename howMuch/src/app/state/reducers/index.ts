import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as market from './market.reducer';

export interface State {
  market: market.MarketState;
}

export const reducers: ActionReducerMap<State> = {
  market: market.marketReducer
};


export const metaReducers: MetaReducer<State>[] = environment.production && [] || [];
