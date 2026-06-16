// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJrmXy-7IlKn0Hqq1TPeitTHr_0OhG7HQ',
  authDomain: 'smart-deals-auth-6e494.firebaseapp.com',
  projectId: 'smart-deals-auth-6e494',
  storageBucket: 'smart-deals-auth-6e494.firebasestorage.app',
  messagingSenderId: '745836250479',
  appId: '1:745836250479:web:4bd177e1123873704d549a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
