import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD7lXFOqZVIf0n4QCQyy2YBjXIgNO4Ga8c",
    authDomain: "reactinstatutorial-d4b93.firebaseapp.com",
    projectId: "reactinstatutorial-d4b93",
    storageBucket: "reactinstatutorial-d4b93.appspot.com",
    messagingSenderId: "490943148648",
    appId: "1:490943148648:web:d87f7089970ec8096dc1dd"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{ db, auth, storage, provider} ; 