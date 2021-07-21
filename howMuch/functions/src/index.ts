import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AlgoliaMyShopTracking } from './algolia';

const app = admin.initializeApp();
const firestore = app.firestore();

const algoliaMyShopTracking = new AlgoliaMyShopTracking();
export const historyPrice = functions.firestore.document('/products/{barcode}/supermarkets/{supermarket}').onWrite(async (snapshot, context) => {
    if (snapshot.after.exists) {
        const time = new Date();

        const obj = { ...snapshot.after.data(), date: time.getTime() };

        const product = await firestore.doc(`/products/${context.params.barcode}`).get();
        const data = { ...product.data(), ...snapshot.after.data() };
        delete data.id;

        await firestore.doc(`/supermarkets/${context.params.supermarket}/products/${context.params.barcode}`).set(data);
        await firestore.doc(`/products/${context.params.barcode}/supermarkets/${context.params.supermarket}/history/${time.getTime()}`).set(obj);
        return true;
    } else return null;
});

export const createIndexAlgolia = functions.firestore.document('/products/{barcode}')
    .onWrite(async (snapshot, context) => await algoliaMyShopTracking.saveObjectAlgolia(snapshot.after, context.params));
