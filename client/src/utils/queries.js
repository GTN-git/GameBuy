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
<<<<<<< HEAD
`
=======
`

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;

// export const QUERY_ALL_PRODUCTS = gql`
//   {
//     products {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

// export const QUERY_USER = gql`
//   {
//     user {
//       firstName
//       lastName
//       orders {
//         _id
//         purchaseDate
//         products {
//           _id
//           name
//           description
//           price
//           quantity
//           image
//         }
//       }
//     }
//   }
// `;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
>>>>>>> cfabcb59b7cf7e17e380c8ac1525332bded4dd2f
