import React, { useContext } from "react";
import { StoreContext } from "../components/Contexts/Context";

export default function FAQTemplate3(tags, photoUrls, photoTypes) {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "templates/page.my-FAQ-Template-3.faq.liquid",
        value: `
{{'faq3.css' | asset_url | stylesheet_tag}}
<div class="page-width">
  <div class="grid">
    <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
      <div class="section-header text-center">
        <h1>{{ page.title }}</h1>
      </div>

     
        <div class="rte">
          
          {{'https://www.w3schools.com/w3css/4/w3.css' | stylesheet_tag }}
          {{'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css' | stylesheet_tag }}
          
          
    <!--         Carousel Content -->

        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators w3-display-bottommiddle carousel-sliders">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            ${photoTypes
              .slice(1)
              .map(
                index => `
              <li data-target="#myCarousel" data-slide-to=${index + 1}></li>
            `
              )
              .join("")}
          </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <div class="item active">
        <div class="image-border">
          <img  class="image-content" src={{ ${
            photoTypes[0]
          }| asset_url }}>      
        </div>
      </div>

      ${photoTypes
        .slice(1)
        .map(
          photoName => `
      <div class="item">
        <div class="image-border">
          <img class="image-content" src={{${photoName} | asset_url }}>
        </div>
      </div>
      `
        )
        .join("")}

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  
  <br/>
  <br/>

  <div class="row">
    <div class="col4-categories tag-divider">
      <ol id="list-group">
        

      
      </ol>
    </div>
      <div class="col4">
        <div id="${tags[0].name}" class="questions revealed">
          <ol class="plain-list">
          ${console.log("Tag 0 Question ID's", tags[0].questionIds)}
          ${tags[0].questionIds
            .map(
              (q, qIndex) => `
            <li class="list-divider list-buttton-divider">
              <button onclick="document.getElementById('question${qIndex}-${tags[0].name}').style.display='inline-block'" class="w3-button list-button">${q.question}</button>
            </li>
          `
            )
            .join("")} 
          </ol>
        </div>
        ${console.log("Tags Sliced", tags.slice(1))}
        ${tags
          .slice(1)
          .map(
            tag => `
        <div id=${tag.name} class="questions hidden">
          <ol class="plain-list">
          ${console.log("Tag.questionIds", tag.questionIds)}
          ${tag.questionIds
            .map(
              (q, qIndex) => `
            <li class="list-divider">
              ${console.log("Tag NAme", tag.name)}
              <button onclick="document.getElementById('question${qIndex}-${
                tag.name
              }').style.display='inline-block'" class="w3-button">${
                q.question
              }</button>
            </li>
          `
            )
            .join("")}	
          </ol>
        </div>
        `
          )
          .join("")}


        
      </div>

      ${tags
        .map(
          tag => `
        ${tag.questionIds
          .map(
            (q, qIndex) => `
          <div id="question${qIndex}-${tag.name}" class="w3-modal">
            <div class="w3-modal-content">
              <div class="w3-container center">
                <span onclick="document.getElementById('question${qIndex}-${tag.name}').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                <h3>${q.question}</h3>
                <p>${q.answer}</p>
                <br/>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      `
        )
        .join("")}
             
      
    </div>
  
               
         {{'ToggleClasses.js' | asset_url | script_tag }}   
         {{'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js' | script_tag }}
         {{'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js' | script_tag }}
      
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

export function FAQTemplate3CSS() {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "assets/faq3.css",
        value: `
        .row{
          display: flex;
          flex-wrap: wrap;
      /*   	margin-top: 35%; */
      }
      
      @media only screen and (min-width:768px){
          .col1 {flex-basis: 8.33%;}
          .col2 {flex-basis: 16.66%;}
          .col3 {flex-basis: 25%;}
          .col4-categories {
              flex-basis: 30%;
              text-align: center;
              margin-left: 1%;
              margin-right: 1%;
              margin-bottom: 2%;
              margin-top: 0%;
             overflow: auto;
          }
        
          .col4 {
              flex-basis: 66%;
              text-align: center;
              margin-left: 1%;
              margin-right: 1%;
              margin-bottom: 2%;
              height: 305px !important;
              overflow: auto;
          }
        
          .col4-title{
              flex-basis: 30%;
              text-align: center;
              margin-left: 1%;
              margin-right: 1%;
              margin-bottom: 0%;
              height: 0px;
          }
          .col5 {
              flex-basis: 41.66%;
          }
          .col6 {
              flex-basis: 50%;
              margin-left: 5%;
          }
          .col-7 {flex-basis: 58.33%;}
          .col8 {
              flex-basis: 66%;
              margin-left: 1%;
              margin-right: 1%;
              text-align: center;
              margin-bottom: 0%;
          }
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
      
      
      .header{
         background-color: lightblue; 
      }
      
      
      .list{
         list-style-type: none !important;
          text-align: left;
          color: gray;
      }
      
      
      .list-active{
          text-decoration: underline;
          list-style-type: none;
          font-weight: bold;
          color: black;
      }
      
      .hidden{
         display: none; 
          
      }
      
      .revealed{
        display: inline-block;
        text-align: center;
        
      }
      
      .plain-list{
          list-style-type: none;
          text-align: left
      }
      
      
      
      .list-divider{
         box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          padding: 16px;
          text-align: center;
         background-color: #f1f1f1;
          border: solid 3px black;
      }
      
      .tag-divider{
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          padding: 16px;
          text-align: center;
         background-color: #f1f1f1;
          border: solid 3px black;
          text-align: center;
      }
      
      
      
      .carousel-text{
         color: white;
          background-color: #353836;
          margin-bottom: 20px !important;
          font-size: 30px;
      }
      
      .carousel-sliders{
         margin-top:50px !important; 
      }
      
      .image-border{
        width:100%;
        height:250px;
        object-fit:cover;
        background-repeat: no-repeat;
      }

      .image-content{
        width: 100%;
        height: auto;  
        min-height: 250px !important;
      }
      
      .list-button{
         width: 100%; 
          padding-left: 0%;
          padding-right: 0%;
          padding-top: 0%;
          padding-bottom: 0%;
      }
      
      .list-button-divider{
         padding-left: 0%;
          padding-right: 0%;
          padding-top: 0%;
          padding-bottom: 0%;
      }
      
      .message-text{
         text-align: center; 
          margin-top: 3% !important;
          margin-bottom: 3% !important;
      }
      
      .questions{
         width: 100%; 
      }
      
      .center {
        margin-top: 30% !important;
        margin-bottom: 30% !important;
        
      }      
      
        `
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
}

export function FAQTemplate3JS() {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "assets/ToggleClasses.js",
        value: ` 
        
var header = document.getElementById("list-group");
var listItem = header.getElementsByClassName("list");
for (var i = 0; i < listItem.length; i++) {
  listItem[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("list-active");
  current[0].className = current[0].className.replace(" list-active", "");
  this.className += " list-active";
    
    
   	var selectedElement = document.getElementsByClassName("list list-active")[0].innerText;
  
  	var selectedElement2 = document.getElementsByClassName("list list-active");
  
  	console.log("Selected Element: ", selectedElement);
  	console.log("Selected Element2: ", selectedElement2);
  
  	var selectedDiv = document.getElementById(selectedElement);
  
  	console.log("Selected Div: ", selectedDiv);
  
  	
	var listItemQuestions = document.getElementsByClassName("questions");
  	console.log("List Items Grabbed: ", listItemQuestions);
	for (var i = 0; i < listItemQuestions.length; i++) {
  		listItemQuestions[i].className = "questions hidden";
    }
  	selectedDiv.className = "questions revealed";
  });
}

      
        `
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
}

export function FAQTemplate3Pictures(pictureUrls, pictureTypes) {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "assets/" + pictureTypes,
        attachment: pictureUrls
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
}
