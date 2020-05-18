import { Query } from "react-apollo";
import { gql } from "apollo-boost";

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

export function GetShopUrl(props) {
  return (
    <Query query={getUrl}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        console.log("ADFASDFASDFASDFASDf", data);
        console.log("REEEEE", data.shop.primaryDomain.host);
        //props.onShopUrl(data.shop.primaryDomain.host)
        return <p>Stuff here</p>;
      }}
    </Query>
  );
}
