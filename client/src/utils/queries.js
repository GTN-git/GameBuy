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
<<<<<<< HEAD
`

// sets up checkout query
=======
`;

>>>>>>> 63131af543ee4c3d378fb7f33d1e9eaeaf5f2de2
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
