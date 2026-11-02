// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStripePayments } from "@invertase/firestore-stripe-payments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC5QZ6xwyipWqwnX7YLHVDV5PpuduUaVY",
  authDomain: "summarist-firebase.firebaseapp.com",
  projectId: "summarist-firebase",
  storageBucket: "summarist-firebase.firebasestorage.app",
  messagingSenderId: "1080573503901",
  appId: "1:1080573503901:web:999c99c8c1e920839a2774"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});