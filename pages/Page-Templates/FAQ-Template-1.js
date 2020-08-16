import React, { useContext } from "react";
import { StoreContext } from "../components/Contexts/Context";

export default function FAQTemplate1(tags) {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "templates/page.my-FAQ-Template-1.faq.liquid",
        value: `
        {{'faq1.css' | asset_url | stylesheet_tag}}


        

        <div class="page-width">
            <div class="grid">
                <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
          
              
      
                    <div class="rte">  
                        <div class="center-title">
                            <h1>{{ page.title }}</h1>
                        </div>
                
                        <div class="row">
                            ${tags
                              .map(
                                (tag, index) => `
                            <div class="col-12">
                                <h3 class="title-for-panels"> ${tag.name} </h3>
                                ${tag.questionIds
                                  .map(
                                    q => `
                                    <button class="accordion">${q.question}</button>
                                    <div class="panel">
                                        <p>${q.answer}</p>
                                    </div>
                                `
                                  )
                                  .join("")}
                                
                            </div>

                            `
                              )
                              .join("")}
                        </div>
                        {{'expansion-panel.js' | asset_url | script_tag }}
                    </div>
                </div>
            </div>
        </div>
      
        `
      }
    })
  }).then(response => response.json());
  return null;
}

export function FAQTemplate1CSS() {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "assets/faq1.css",
        value: `
        .accordion {
          background-color: #eee;
          color: #444;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          border: none;
          text-align: left;
          outline: none;
          font-size: 15px;
          transition: 0.4s;
        }
        
        .active, .accordion:hover {
          background-color: #ccc; 
        }
        
        .panel {
          padding: 0 18px;
          display: none;
          background-color: white;
          overflow: hidden;
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
                flex-basis: 30%;
                text-align: center;
                margin-left: 1%;
                margin-right: 1%;
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
        
        .title-for-panels{
          text-align: left;
            padding-top: 5%;
            margin-bottom: 0%;
            padding-bottom: 0%;
        }
        
        .arrow-right{
            float: right;
          
        }
        
        .center-title{
           width: 100%;
            text-align: center;
            border-bottom: solid 2px black;
        }
      
        `
      }
    })
  }).then(response => response.json());
  return null;
}

export function FAQTemplate1JS() {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "assets/expansion-panel.js",
        value: ` 
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
        }
      
        `
      }
    })
  }).then(response => response.json());
  return null;
}
