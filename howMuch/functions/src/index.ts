import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AlgoliaMyShopTracking } from './algolia';

const algoliaMyShopTracking = new AlgoliaMyShopTracking();

export const historyPrice = functions.firestore.document('/products/{barcode}/supermarkets/{supermarket}').onWrite(async (snapshot, context) => {
    if (snapshot.after.exists) {
        const time = new Date();

        const obj = { ...snapshot.after.data(), date: time.getTime() };

        const product = await admin.firestore().doc(`/products/${context.params.barcode}`).get();
        let data = product.data() || {};
        data = Object.assign(data, snapshot.after.data());
        delete data.id;

        await admin.firestore().doc(`/supermarkets/${context.params.supermarket}/products/${context.params.barcode}`).set(data);
        await admin.firestore().doc(`/products/${context.params.barcode}/supermarkets/${context.params.supermarket}/history/${time.getTime()}`).set(obj);
        return true;
    } else return null;
});

export const createIndexAlgolia = functions.firestore.document('/products/{barcode}')
    .onCreate((snapshot) => algoliaMyShopTracking.saveObjectAlgolia(snapshot));

export const updateProductAlgolia = functions.firestore.document('/products/{barcode}')
    .onUpdate((snapshot) => algoliaMyShopTracking.saveObjectAlgolia(snapshot));
