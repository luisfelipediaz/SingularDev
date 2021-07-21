import { createAction, props } from '@ngrx/store';
import { Supermarket, TypeWithOrder } from '../../app.model';

export const base = '[Supermarket]';

export const loadSupermarket = createAction(`${base} load`);
export const addSupermarket = createAction(`${base} add`, props<{ supermarket: Supermarket }>());
export const addedSupermarket = createAction(`${base} added`, props<TypeWithOrder<Supermarket>>());
export const modifiedSupermarket = createAction(`${base} modified`, props<TypeWithOrder<Supermarket>>());
export const removedSupermarket = createAction(`${base} removed`, props<{ payload: Supermarket }>());
