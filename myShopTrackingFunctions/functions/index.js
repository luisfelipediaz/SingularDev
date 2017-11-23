const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.changeProduct = functions.firestore.document('/products/{barcode}').onWrite(snapshot => {
//     if (snapshot.data.exists) {
//         return admin.firestore().collection(`/products/${snapshot.params.barcode}/supermarkets`).get().then(supermarkets => {
//             let product = snapshot.data.data();
//             supermarkets.forEach(supermarket => {
//                 let data = Object.assign({}, product);
//                 data = Object.assign(data, supermarket.data());
//                 data.id = null;
//                 admin.firestore().doc(`/supermarkets/${supermarket.id}/products/${product.id}`).set(data).catch(err => {
//                     console.log(err);
//                 });
//             });
//         });
//     }
// });

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