import * as firebase from "firebase";
import "firebase/database";

export default function AccessDatabase() {
  console.log("FIREBASE_FILE");
  const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: process.env.AUTH_DOMAIN_FIREBASE,
    databaseURL: process.env.DATABASE_URL_FIREBASE,
    //     projectId: process.env.PROJECT_ID_FIREBASE,
    projectId: "shopify-faq-app-official",
    storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.APP_ID_FIREBASE
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  module.exports.db = db.database();

  //The Start of Mock Changes to the Store

  var docRef = db.collection("stores").doc("965NWWqucmxuxEA0Ug0D");

  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

  docRef
    .update({
      template_selected: 3
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

  //End of Mock changes to the Store
}
