const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.historyPriceFS = functions.firestore.document('/products/{barcode}/supermarkets/{supermarket}').onWrite((snapshot) => {
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

        return admin.firestore().doc(`/products/${snapshot.params.barcode}/supermarkets/${snapshot.params.supermarket}/history/${time.getTime()}`).set(obj);
    } else return null;
});