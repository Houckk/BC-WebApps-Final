import React from "react";
import Cookies from "js-cookie";

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
  var fetchUrl = "/api/pages";
  var method = "POST";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      page: {
        title: "Warranty information",
        body_html:
          "<h2>Warranty</h2>\n<p>Returns accepted if we receive items <strong>30 days after purchase</strong>.</p>"
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
};

// export function GetPages(){

//     const shopOrigin = Cookies.get("shopOrigin");
//     console.log("Template Pages shopOrigin", shopOrigin)
//     const shopify = new Shopify({
//         shopName: shopOrigin,
//         accessToken: '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'
//       });

//     shopify.pages
//       .then(())
// }
