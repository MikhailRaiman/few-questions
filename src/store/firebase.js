import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { authState } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import { filter } from 'rxjs/operators';

const firebaseConfig = {
  apiKey: "AIzaSyAb2EJ31fjA2pjIZ6JqnHyzqoDX99lttoc",
  authDomain: "few-questions.firebaseapp.com",
  projectId: "few-questions",
  storageBucket: "few-questions.appspot.com",
  messagingSenderId: "85469234346",
  appId: "1:85469234346:web:e239f6586a25369095bcd3",
  measurementId: "G-2W4VQ8TJ9F"
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore(app);
const auth = firebase.auth(app);
const loggedIn$ = authState(auth).pipe(filter(user => !!user));

export { app, auth, firestore, collectionData, loggedIn$ };

export default firebase;