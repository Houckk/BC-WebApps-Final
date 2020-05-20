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

//This export function successfully queries and returns the data we need
// export function GetShopUrl() {
//   return (
//     <Query query={getUrl}>
//       {({ data, loading, error }) => {
//         if (loading) return <div>Loading…</div>;
//         if (error) return <div>{error.message}</div>;
//         console.log("Query Results", data);
//         console.log("Url", data.shop.primaryDomain.host);
//       return <p>{data.shop.primaryDomain.host}</p>;
//       }}
//     </Query>
//   );
// }
