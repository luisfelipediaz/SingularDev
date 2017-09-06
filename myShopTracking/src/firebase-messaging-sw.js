
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js')

firebase.initializeApp({
  'apiKey': "AIzaSyBlabEzswLpwtmtR4Wqz8m13Egf-H-hr9E",
  'messagingSenderId': '35947451087'
});

const messaging = firebase.messaging();

messaging.getToken().then((token) => {
  console.log('Token de notificaciones push:');
  console.log(token);
});