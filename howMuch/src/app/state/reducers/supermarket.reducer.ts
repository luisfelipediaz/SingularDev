import { Supermarket } from '../../app.model';
import { createReducer, on, Action } from '@ngrx/store';

import * as supermarketActions from '../actions/supermarket.actions';

export interface SupermarketState {
    ids: string[];
    entities: { [dni: string]: Supermarket };
    selectedId: string;
}

export const initialState: SupermarketState = {
    ids: null,
    entities: null,
    selectedId: null
};

const supermarketReducer = createReducer(
    initialState,
    on(supermarketActions.addedSupermarket, (state, action) => {
        const ids = [...state.ids || []];
        const entities = { ...state.entities };
        entities[action.payload.id] = action.payload;

        if (ids[action.newIndex] !== action.payload.id) { ids.splice(action.newIndex, 0, action.payload.id); }

        return { ...state, entities, ids };
    }),
    on(supermarketActions.modifiedSupermarket, (state, action) => {
        const ids = [...state.ids];
        ids.splice(action.oldIndex, 1);
        ids.splice(action.newIndex, 0, action.payload.id);
        const entities = { ...state.entities };
        entities[action.payload.id] = action.payload;
        return { ...state, entities, ids };
    }),
    on(supermarketActions.removedSupermarket, (state, action) => {
        const entities = { ...state.entities };
        delete entities[action.payload.id];
        const ids = state.ids.filter(id => id in entities);
        return { ...state, entities, ids };
    })
);

export function reducer(state: SupermarketState | undefined, action: Action) {
    return supermarketReducer(state, action);
}
