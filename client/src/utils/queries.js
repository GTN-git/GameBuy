import gql from 'graphql-tag';

// sets up all user query
export const ALL_USERS = gql`
    {
        users{
            username
            games{
              name
              cover
              rating
              condition
              platform
              price
            }
          }
    }
`;

// sets up all games query
export const ALL_GAMES = gql`
{
  games {
    _id
    name
    cover
    release_date
    rating
    condition
    price
    seller
  }
}
`

// sets up checkout query
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
