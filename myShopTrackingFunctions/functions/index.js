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
            price: snapshot.data.val()
        };

        return admin.database().ref(`/history/${snapshot.params.barcode}/${snapshot.params.supermarket}/${time.getTime()}`).update(obj);
    }
});