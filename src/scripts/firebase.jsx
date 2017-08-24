  import firebase from 'firebase'
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAuIxsjTUUCwPBy9lYbUqXM0n1D-en__BY",
    authDomain: "kings-draft.firebaseapp.com",
    databaseURL: "https://kings-draft.firebaseio.com",
    projectId: "kings-draft",
    storageBucket: "kings-draft.appspot.com",
    messagingSenderId: "91431442164"
  };
  firebase.initializeApp(config);
  export default firebase;