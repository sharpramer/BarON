import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBc-PnDIcJ1Pd2IdNC2ESQLPEfd-VS9-6g",
  authDomain: "divino-barra.firebaseapp.com",
  projectId: "divino-barra",
  storageBucket: "divino-barra.appspot.com",
  messagingSenderId: "604976514096",
  appId: "1:604976514096:web:9ecd64de092c46c6b219f5"
};


export const app = initializeApp(firebaseConfig);

export const bd = getFirestore(app)

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth()
  }
  console.log(`Deu erro: ${error}`)
}

export let auth