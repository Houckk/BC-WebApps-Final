import React, { createContext, useState } from "react";
import initialStore from "../../Utils/InitialStore";
import * as firebase from "firebase";
import "firebase/database";

// export the context so that other components can import
export const StoreContext = createContext();

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
var docRef = db.collection("stores").doc("965NWWqucmxuxEA0Ug0D");

function StoreContextProvider(props) {
  //const [store, setStore] = useState(initialStore);
  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [tags, setTags] = useState([]);

  function addFirstQuestion(question, tagId) {
    console.log(question);

    const Tag = {
      id: tagId,
      name: tagId,
      questionIds: [question]
    };
    console.log(Tag.questionIds);

    setTags(tags.filter(tag => !(tag.id == tagId)).concat(Tag));
    setQuestionBank(questionBank.filter(q => !(q.id == question.id)));
  }

  function addToTagArray(question, tagId) {
    const Tag = {
      id: tagId,
      name: tagId,
      questionIds: [question]
    };

    setTags(tags.filter(tag => !(tag.id == tagId)).concat(Tag));
    setQuestionBank(questionBank.filter(q => !Tag.questionIds.includes(q)));
  }

  function addTag(tag) {
    setTags(
      tags.concat({
        id: tag,
        name: tag,
        questionIds: []
      })
    );
    docRef.update({
      id: tag,
      name: tag,
      questionIds: []
    });
  }

  function removeTag(tag) {
    setTags(tags.filter(d => !(d.id == tag.id)));
  }

  function addToQuestions(question) {
    docRef.set({
      id: question.id,
      question: question.question,
      answer: question.answer,
      questionBank: question.questionBank
    });
    setQuestions(questions.concat(question));
  }

  function removeFromQuestionBank(questions, tagId) {
    setQuestions(questionBank.filter(q => questions.includes(q)));
  }

  function updateOrCreateAccessToken(storeUrl, accessToken) {
    var allStores = db.collection("stores");
    var selectedStore = allStores.where("url", "==", storeUrl);

    if (selectedStore === undefined) {
      var newStoreRef = db.collection("stores").doc(storeUrl);
      newStoreRef
        .set({
          accessToken: accessToken,
          url: storeUrl
        })
        .then(function() {
          console.log("New document written with ID: ", storeUrl);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    } else {
      var oldStoreRef = db.collection("stores").doc(storeUrl);
      oldStoreRef
        .update({
          accessToken: accessToken
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }

  return (
    <StoreContext.Provider
      value={{
        questions,
        tags,
        questionBank,
        addFirstQuestion,
        addTag,
        removeTag,
        addToQuestions,
        addToTagArray,
        removeFromQuestionBank,
        updateOrCreateAccessToken
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
export default StoreContextProvider; // export this component as default
