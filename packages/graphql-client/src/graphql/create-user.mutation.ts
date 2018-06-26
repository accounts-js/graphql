import gql from 'graphql-tag';

export const createUserMutation = gql`
  mutation($user: CreateUserInput!) {
    register(user: $user): ID
  }
`;
