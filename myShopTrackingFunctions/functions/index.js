const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.historyPrice = functions.database.ref('/products/{barcode}/supermarkets/{supermarket}').onWrite((snapshot) => {
    if (!!snapshot.data.val()) {
        const time = new Date();
        const obj = {
            date: time.getTime(),
            price: snapshot.data.val()
        };

        admin.firestore().doc(`/products/${snapshot.params.barcode}/supermarkets/${snapshot.params.supermarket}/history/${time.getTime()}`).set(obj);

        return admin.database().ref(`/history/${snapshot.params.barcode}/${snapshot.params.supermarket}/${time.getTime()}`).update(obj);
    } else return null;
});
exports.historyPriceFS = functions.firestore.document('/products/{barcode}/supermarkets/{supermarket}').onWrite((snapshot) => {
    if (snapshot.data.exists) {
        const time = new Date();

        const obj = __assign({
            date: time.getTime()
        }, snapshot.data.data());

        admin.database().ref(`/history/${snapshot.params.barcode}/${snapshot.params.supermarket}/${time.getTime()}`).update(obj);

        return admin.firestore().doc(`/products/${snapshot.params.barcode}/supermarkets/${snapshot.params.supermarket}/history/${time.getTime()}`).set(obj);
    } else return null;
});


var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};