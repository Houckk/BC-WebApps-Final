import React, { useContext } from "react";
import { StoreContext } from "../components/Contexts/Context";

export default function FAQTemplate2(tags) {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "templates/page.my-FAQ-Template-2.faq.liquid",
        value: `
<div class="page-width">
  <script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  </script>
  {{'faq2.css' | asset_url | stylesheet_tag}}
  <div class="grid">
    <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
      <div class="section-header text-center">
        <h1 class="title-info">{{ page.title }}</h1>
      </div>

      <div class="rte">

        {{ page.content }}
        
         
        <br/>
        <br/>
        <br/>
      
        <div class="row">

        ${tags
          .map(
            (tag, index) => `
          <div class="col4">
            <a href="/pages/${tag.name}">
              <button class="card">             
                ${tag.name}
              </button>
            </a>
          </div>
        `
          )
          .join("")}
        </div>
      </div>
    </div>
  </div>
</div>
        `
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
}

export function FAQTemplate2CSS() {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "assets/faq2.css",
        value: `
        .title-info{
          border-bottom: solid 2px black; 
           padding-bottom: 50px;
       }
       
       .row{
           display: flex;
           flex-wrap: wrap;
       /*   	margin-top: 35%; */
       }
       
       @media only screen and (min-width:768px){
           .col1 {flex-basis: 8.33%;}
           .col2 {flex-basis: 16.66%;}
           .col3 {flex-basis: 25%;}
           .col4 {
               flex-basis: 31%;
               text-align: center;
               margin-left: 1%;
               margin-right: 1%;
               margin-bottom: 2%;
               height: 250px;
           }
           .col5 {
               flex-basis: 41.66%;
           }
           .col6 {
               flex-basis: 50%;
               margin-left: 5%;
           }
           .col-7 {flex-basis: 58.33%;}
           .col-8 {flex-basis: 66.66%;}
           .col-9 {flex-basis: 75%;}
           .col-10 {flex-basis: 83.33%;}
           .col-11 {flex-basis: 91.66%;}
           .col-12 {
             flex-basis: 94%;
             text-align: center;
             margin-left: 3%;
             margin-right: 3%;
             margin-top: 0%;
           
           }
           .row{
               flex-direction: row;
           }
           
       }
       
       .card {
         box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
         padding: 16px;
         text-align: center;
         background-color: #f1f1f1;
         width: 100%;
         height: 100%;
         border: none;
       }
       
       .plain-list{
           list-style-type: none;
           text-align: left
       }
       
       .title-content{
          width: 100%;
           border-bottom: solid 2px black;
           display: flex;
           justify-content: space-between;
           padding-bottom: 0% !important;
           margin-bottom: 0% !important;
       }
       
       .body-content{
          padding-top: 0% !important;
           margin-top: 0% !important; 
       }
      
        `
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
}

export function FAQTemplate2Redirects(tagName, tagQA) {
  console.log("TagName: ", tagName);
  console.log("tagQA: ", tagQA);
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "templates/asdfasfasdf",
        value: ` 
        <div class="page-width">
        {{'faq2.css' | asset_url | stylesheet_tag}}
        <div class="grid">
          <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
            <div class="section-header text-center">
              <div class="title-content">
                <h1>${tagName}</h1>
                 <h1>
                  <a href="/pages/faq-template-2">
              Return to FAQ Home
                  </a>
                </h1>
              </div>
            </div>
      
            <div class="rte body-content">
              {{'https://www.w3schools.com/w3css/4/w3.css' | stylesheet_tag }}
              
              ${tagQA
                .map(
                  (q, index) => `
                <div class="card">
                  <ol class="plain-list">
                    <li>
                        <button onclick="document.getElementById('question${index}').style.display='block'" class="w3-button ">${q.question}</button>
                    </li>
                  </ol>
                </div>

                <div id="question1" class="w3-modal">
                  <div class="w3-modal-content">
                    <div class="w3-container">
                      <span onclick="document.getElementById('question${index}').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                      <h3>${q.question}</h3>
                      <p>${q.answer}</p>
                      <br/>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
      
          `
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));

  return null;
}
