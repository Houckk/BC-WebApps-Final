import React, { useState } from "react";
import "./Debut.module.css";
import { Link } from "@shopify/polaris";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Template4Preview(props) {
  const tags = props.tags;

  return (
    <div>
      <div className="page-width">
        <div>
          <h1 className="display-4">Your Questions, Answered</h1>
          <p className="lead">
            We hope that we have been able to answer all your questions.
          </p>
          <hr className="my-4" />
        </div>
        <div className="grid">
          <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
            {tags.map((tag, index) => (
              <div>
                <p>
                  <button
                    className="btn btn-block"
                    data-toggle="collapse"
                    href={`#collapseExample${index}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExmaple"
                  >
                    {tag.name}
                  </button>
                </p>
                <div className="collapse" id={`collapseExample${index}`}>
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
