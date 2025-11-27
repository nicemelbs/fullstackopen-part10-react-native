import { gql } from '@apollo/client';
import { USER_DETAILS } from './fragments';

export const SIGN_IN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      createdAt
      id
      rating
      text
      user {
        ...UserDetails
      }
    }
  }
  ${USER_DETAILS}
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;
