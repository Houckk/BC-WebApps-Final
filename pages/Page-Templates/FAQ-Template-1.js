import React from "react";
import Cookies from "js-cookie";
import SimpleExpansionPanel from "./UI-Components/ExpansionPanel";

// export const GetPages = () => {
//   var fetchUrl = "/api/pages";
//   var method = "GET";
//   fetch(fetchUrl, {
//     method: method
//   })
//     .then(response => response.json())
//     .then(json => console.log(json));
//   return null;
// };

export const GetPages = () => {
  // var fetchUrl = "/api/pages";
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "templates/page.faq.liquid",
        // value: '<div class="page-width"><div class="grid"><div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth"><div class="section-header text-center"><h1>{{ page.title }}</h1></div><div class="rte">{{ page.content }}Howdy Is this working!!!</div></div></div></div>'
        value: `<div class="page-width">
  <div class="grid">
    <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
      <div class="section-header text-center">
        <h1>{{ page.title }}</h1>
      </div>

      <div class="rte">
        {{ page.content }}
        Howdy!!!!!

        
        HIIIII Is this working!!!
      </div>
    </div>
  </div>
</div>`
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
};
