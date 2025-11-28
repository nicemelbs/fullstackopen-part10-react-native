import { gql } from '@apollo/client';

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    rating
    repository {
      fullName
    }
    text
    createdAt
    user {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
    reviews {
      edges {
        node {
          ...ReviewDetails
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;
