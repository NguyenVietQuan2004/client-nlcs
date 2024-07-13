import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDepswhmkVGRCxvQQNqjWCcJv2Tcmf6g3c",
  authDomain: "ecommerce-cms-b2fd1.firebaseapp.com",
  projectId: "ecommerce-cms-b2fd1",
  storageBucket: "ecommerce-cms-b2fd1.appspot.com",
  messagingSenderId: "1063276636155",
  appId: "1:1063276636155:web:b2a792d6af22a503478d5e",
  measurementId: "G-LD4G0KS2DZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
