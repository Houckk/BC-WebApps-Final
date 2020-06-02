export const GetPages2 = () => {
  // var fetchUrl = "/api/pages";
  var fetchUrl = "/liquid/all_themes";
  var method = "GET";
  fetch(fetchUrl, {
    method: method
  })
    .then(response => response.json())
    .then(json => console.log("FAQ-TEMPLATE-2 Response:", json));
  return null;
};
