import { PushOptions } from "@ionic-native/push";

export class AppConfig {
    public static firebaseConfig = {
        apiKey: "AIzaSyBlabEzswLpwtmtR4Wqz8m13Egf-H-hr9E",
        authDomain: "shoptracking-90587.firebaseapp.com",
        databaseURL: "https://shoptracking-90587.firebaseio.com",
        projectId: "shoptracking-90587",
        storageBucket: "shoptracking-90587.appspot.com",
        messagingSenderId: "35947451087"
      };
    
    public static  pushOptions: PushOptions = {
        android: {
          senderID: '35947451087'
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {},
        browser: {
          pushServiceURL: 'https://fcm.googleapis.com/fcm/send'
        }
      };
}