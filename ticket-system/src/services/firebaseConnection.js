import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCNunwTglDOtPKnzIeI58CxEciW3QQOUUM",
    authDomain: "tickets-32211.firebaseapp.com",
    projectId: "tickets-32211",
    storageBucket: "tickets-32211.appspot.com",
    messagingSenderId: "277021946770",
    appId: "1:277021946770:web:112bf246b174b81274c74b",
    measurementId: "G-LMFQTKN6XN"
  };
  
  const firebaseApp = initializeApp(firebaseConfig)

  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  export { auth, db, storage }