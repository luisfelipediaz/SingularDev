import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, map, take } from 'rxjs/operators';

import * as supemarketActions from '../actions/supermarket.actions';

@Injectable()
export class SupermarketEffects {
    constructor(
        private actions$: Actions,
        private firestore: AngularFirestore
    ) { }

    loadSupermarket$ = createEffect(() => this.actions$.pipe(
        ofType(supemarketActions.loadSupermarket),
        take(1),
        mergeMap(() => this.firestore.collection(`supermarkets`).snapshotChanges().pipe(
            mergeMap(actions => actions),
            map(action => ({
                type: `${supemarketActions.base} ${action.type}`,
                payload: { id: action.payload.doc.id, ...action.payload.doc.data() as object },
                oldIndex: action.payload.oldIndex,
                newIndex: action.payload.newIndex
            }))
        ))
    ));
}
