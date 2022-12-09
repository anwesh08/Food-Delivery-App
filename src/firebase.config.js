import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDN_Brg2gmlP8aEvIsLFbs1Ug_cFL55Is4",
  authDomain: "fooddeliveryapp-ffaa9.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp-ffaa9-default-rtdb.firebaseio.com",
  projectId: "fooddeliveryapp-ffaa9",
  storageBucket: "fooddeliveryapp-ffaa9.appspot.com",
  messagingSenderId: "31479465743",
  appId: "1:31479465743:web:c0b394b52e8f1bd1d6607a",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
