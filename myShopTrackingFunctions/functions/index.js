const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

admin.initializeApp(functions.config().firebase);

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'products';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

exports.historyPrice = functions.firestore.document('/products/{barcode}/supermarkets/{supermarket}')
    .onWrite(
        (snapshot) => {
            if (snapshot.data.exists) {
                const time = new Date();

                const obj = Object.assign({
                    date: time.getTime()
                }, snapshot.data.data());

                admin.firestore().doc(`/products/${snapshot.params.barcode}`).get().then(product => {
                    let data = product.data();
                    data = Object.assign(data, snapshot.data.data());
                    delete data.id;
                    admin.firestore().doc(`/supermarkets/${snapshot.params.supermarket}/products/${snapshot.params.barcode}`).set(data);
                });

                return admin.firestore().doc(`/products/${snapshot.params.barcode}/supermarkets/${snapshot.params.supermarket}/history/${time.getTime()}`)
                    .set(obj);
            } else return null;
        });

exports.createIndexAlgolia = functions.firestore.document('/products/{barcode}')
    .onCreate(
        (snapshot) => {
            const product = snapshot.data.data();
            product.objectID = snapshot.params.barcode;

            const index = client.initIndex(ALGOLIA_INDEX_NAME);

            return index.saveObject(product);
        }
    );

exports.updateProductAlgolia = functions.firestore.document('/products/{barcode}')
    .onUpdate((snapshot) => {
        const index = client.initIndex(ALGOLIA_INDEX_NAME);
        const product = snapshot.data.data();
        product.objectID = snapshot.params.barcode;

        return index.saveObject(product);
    });