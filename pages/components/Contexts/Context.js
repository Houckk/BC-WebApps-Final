import React, { createContext, useState } from "react";
import * as firebase from "firebase";
import "firebase/database";
import "firebase/auth";

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
  const [reset, setReset] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [currentPage, setCurrentPage] = useState("login");
  const [currentUser, setCurrentUser] = useState();

  async function addTag(tag) {
    console.log(tag);
    await setTags(
      tags.concat({
        id: tag,
        name: tag,
        questionIds: []
      })
    );
    console.log(tags);

    const updated = { tags_questions: tags, questions };
    console.log("updated: ");
    console.log(updated);
    fetch("/api/updateTags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tags: updated, user: currentUser })
    }).then(response => response.json());
  }

  function removeTag(tag) {
    setTags(tags.filter(d => !(d.id == tag.id)));
    const updated = { tags_questions: tags, questions };
    fetch("updateTags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tags: updated, user: currentUser })
    }).then(response => response.json());
  }

  async function addToQuestions(question) {
    await setQuestions(questions.concat(question));
    const updated = { tags: tags };
    console.log(updated);
    fetch("/api/updateTags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tags: updated, user: currentUser })
    }).then(response => response.json());
  }

  function setResetGlobal(props) {
    setReset(props);
    const updated = { tags: tags };
    fetch("/api/updateTags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tags: updated, user: currentUser })
    }).then(response => response.json());
  }

  return (
    <StoreContext.Provider
      value={{
        questions,
        tags,
        setTags,
        addTag,
        removeTag,
        addToQuestions,
        setResetGlobal,
        setQuestions,
        username,
        setUsername,
        password,
        setPassword,
        setCurrentPage,
        currentPage,
        currentUser,
        setCurrentUser
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
export default StoreContextProvider; // export this component as default
