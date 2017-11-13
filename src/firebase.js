// Initialize Firebase
import firebase from 'firebase'

  var config = {
    apiKey: "xxxxxxxx",
    authDomain: "xxxxxxx",
    databaseURL: "xxxxxxxx",
    projectId: "xxxxxxx",
    storageBucket: "xxxxx",
    messagingSenderId: "xxxxxxx"
  };

  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

export default firebase;
