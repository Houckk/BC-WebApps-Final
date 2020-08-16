import { Query, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import reactToString from "react-to-string";

const getUrl = gql`
  query {
    shop {
      name
      primaryDomain {
        host
      }
    }
  }
`;
