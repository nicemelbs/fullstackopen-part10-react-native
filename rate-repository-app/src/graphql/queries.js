import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      __typename
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const ME = gql`
  query ($includeReviews: Boolean!) {
    me {
      username
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query repository($id: ID!, $reviewFirst: Int, $reviewAfter: String) {
    repository(id: $id) {
      ...RepositoryDetails

      reviews(first: $reviewFirst, after: $reviewAfter) {
        edges {
          node {
            ...ReviewDetails
          }
        }
        __typename
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REVIEW_DETAILS}
  ${REPOSITORY_DETAILS}
`;
