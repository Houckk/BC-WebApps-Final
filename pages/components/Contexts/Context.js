import React, { createContext, useState } from "react";
import initialStore from "../../Utils/InitialStore";
import Question from "../Question";

// export the context so that other components can import
export const StoreContext = createContext();

function StoreContextProvider(props) {
  const [store, setStore] = useState(initialStore);

  function addFirstQuestion(question, tagId) {
    console.log(question);

    const Tag = {
      id: tagId,
      name: tagId,
      questionIds: [question]
    };
    //questionIds : [store.tags.filter(tag => (tag.id == tagId)).questionIds].concat(question)}
    console.log(Tag.questionIds);

    setStore({
      ...store,
      tags: store.tags.filter(tag => !(tag.id == tagId)).concat(Tag),
      questionBank: store.questionBank.filter(q => !(q.id == question.id))
    });
  }

  function addToTagArray(question, tagId) {
    // console.log("Question Id: " + question.id);
    // console.log("Question Id: " + question.question);
    // console.log("Question Id : " + question.answer);

    const Tag = {
      id: tagId,
      name: tagId,
      questionIds: [question]
    };
    //questionIds : [store.tags.filter(tag => (tag.id == tagId)).questionIds].concat(question)}
    // console.log(Tag.questionIds);

    setStore({
      ...store,
      tags: store.tags.filter(tag => !(tag.id == tagId)).concat(Tag),
      questionBank: store.questionBank.filter(q => !Tag.questionIds.includes(q))
    });
  }

  function addTag(tag) {
    setStore({
      ...store,
      tags: store.tags.concat({
        id: tag,
        name: tag,
        questionIds: []
      })
    });
  }

  function removeTag(tag) {
    setStore({
      ...store,
      tags: store.tags.filter(d => !(d.id == tag.id))
    });
  }

  function addToQuestionBankAndQuestions(question) {
    setStore({
      ...store,
      questions: store.questions.concat(question),
      questionBank: store.questionBank.concat(question)
    });
  }

  function removeFromQuestionBank(questions, tagId) {
    console.log(questions);

    setStore({
      ...store,
      questionBank: store.questionBank.filter(q => questions.includes(q))
    });
  }

  return (
    <StoreContext.Provider
      value={{
        ...store,
        addFirstQuestion,
        addTag,
        removeTag,
        addToQuestionBankAndQuestions,
        addToTagArray,
        removeFromQuestionBank
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
export default StoreContextProvider; // export this component as default
