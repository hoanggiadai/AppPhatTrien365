import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8qeBBfYTgGsvKhveqhbKfl_Q5ap3fdsA",
  authDomain: "phattrien365-e4db3.firebaseapp.com",
  projectId: "phattrien365-e4db3",
  storageBucket: "phattrien365-e4db3.appspot.com",
  messagingSenderId: "259220313441",
  appId: "1:259220313441:web:aec5b708a3af3080c7e120",
  measurementId: "G-7L5B0SL6T4"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);

export { auth, firestore };