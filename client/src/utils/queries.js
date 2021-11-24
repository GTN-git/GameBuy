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
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($games: [ID]!) {
    checkout(games: $games) {
      session
    }
  }
`;
