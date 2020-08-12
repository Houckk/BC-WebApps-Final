import React, { useState } from "react";

export default function Template4Preview(props) {
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
  }

  return (
    <div>
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous"
      ></script>
      <div class="page-width">
        <div>
          <h1 class="display-4">Your Questions, Answered</h1>
          <p class="lead">
            We hope that we have been able to answer all your questions.
          </p>
          <hr class="my-4" />
        </div>
        <div class="grid">
          <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
            {tags.map((tag, index) => (
              <div>
                <p>
                  <button
                    class="btn btn-block"
                    data-toggle="collapse"
                    href="#collapseExample${index}"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExmaple"
                  >
                    {tag.name}
                  </button>
                </p>
                <div class="collapse" id="collapseExample${index}">
                  <div class="card card-body">
                    {tag.questionIds.map(q => (
                      <div>
                        <h4>{q.question}</h4>
                        <p>{q.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
