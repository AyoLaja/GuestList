// Initialize Firebase
import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyAiDcJwy6FhAH9xlGwlPCfT5DBTk1d4XiQ",
    authDomain: "fun-food-friends-b39e4.firebaseapp.com",
    databaseURL: "https://fun-food-friends-b39e4.firebaseio.com",
    projectId: "fun-food-friends-b39e4",
    storageBucket: "fun-food-friends-b39e4.appspot.com",
    messagingSenderId: "178005106721"
  };

  firebase.initializeApp(config);

export default firebase;
