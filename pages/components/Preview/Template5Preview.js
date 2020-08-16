import React, { useState } from "react";
import "./Debut.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Template5Preview(props) {
  const tags = props.tags;
  for (let item of [
    [
      "https://code.jquery.com/jquery-3.5.1.slim.min.js",
      "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    ],
    [
      "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
      "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    ],
    [
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js",
      "sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    ]
  ]) {
    const script = document.createElement("script");

    script.src = item[0];
    script.integrity = item[1];
    script.async = true;
    script.crossOrigin = "anonynmous";

    document.body.appendChild(script);
    document.body.removeChild(script);
  }

  return (
    <div class="page-width">
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
        crossorigin="anonymous"
      ></script>
      <div class="grid">
        <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
          <div class="section-header text-center">
            <h1 class="display-4"> How Can We Help?</h1>
          </div>
          <div class="rte">
            <div class="container" id="parent">
              <div class="row">
                <div class="col-3">
                  <div class="list-group" id="accordionExample">
                    {tags.map((tag, index) => (
                      <button
                        type="button"
                        class="list-group-item list-group-item-action btn"
                        data-toggle="collapse"
                        data-target={`#collapseExample${index}`}
                        aria-expanded="false"
                        aria-controls={`collapseExample${index}`}
                        data-parent="#accordionExample"
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div class="col-9">
                  {tags.map((tag, index) => (
                    <div
                      class="collapse"
                      id={`collapseExample${index}`}
                      data-parent="#parent"
                    >
                      <div class="card card-body">
                        {tag.questionIds.map(q => (
                          <div>
                            <strong>{q.question}</strong>
                            <p>{q.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
