import React, { createContext, useState } from "react";

// export the context so that other components can import
export const StoreContext = createContext();

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
    await setTags(
      tags.concat({
        id: tag,
        name: tag,
        questionIds: []
      })
    );

    const updated = { tags_questions: tags, questions };
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
