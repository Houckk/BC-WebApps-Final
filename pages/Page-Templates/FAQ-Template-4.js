import React, { useContext } from "react";
import { StoreContext } from "../components/Contexts/Context";

export default function FAQTemplate4(tags) {
  var fetchUrl = "/liquid/new_template";
  var method = "PUT";
  fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      asset: {
        key: "templates/page.my-FAQ-Template-4.faq.liquid",
        value: `
            <div class="page-width">
                <div>
                    <h1 class="display-4">Your Questions, Answered</h1>
                    <p class="lead">We hope that we have been able to answer all your questions.</p>
                    <hr class="my-4">
                </div>
                <div class="grid">
                    <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                        ${tags
                          .map(
                            (tag, index) => `
                        <p>
                            <button class="btn btn btn-block" data-toggle="collapse" href="#collapseExample${index}" role="button" aria-expanded="false" aria-controls="collapseExmaple">
                                ${tag.name}
                            </button>
                        </p>
                        <div class="collapse" id="collapseExample${index}">
                            <div class="card card-body">
                                ${tag.questionIds
                                  .map(
                                    q =>
                                      `
                                        <h4>
                                            ${q.question}
                                        </h4>
                                        <p> 
                                            ${q.answer}
                                        </p>
                                    `
                                  )
                                  .join("")}

                            </div>
                        </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
            -->


            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
            {{'FAQ-4.css' | asset_url | stylesheet_tag}}
            {{'bootsrap.css' | asset_url | stylesheet_tag}}
        `
      }
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.body));
  return null;
}
