import gql from 'graphql-tag';

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