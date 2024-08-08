import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDX6PzWhx9ytaoUUD9NH-FEF6m1ocy04aU",
  authDomain: "baron-6bb9f.firebaseapp.com",
  projectId: "baron-6bb9f",
  storageBucket: "baron-6bb9f.appspot.com",
  messagingSenderId: "18610726120",
  appId: "1:18610726120:web:9f7e7949af83afe7cd955d",
  measurementId: "G-PN92N3W8BS"
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const bd = getFirestore(app);