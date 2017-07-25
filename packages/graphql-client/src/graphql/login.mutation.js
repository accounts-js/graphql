import gql from 'graphql-tag';
import { loginFieldsFragment } from './login-fields.fragment';

export const createLoginMutation = userFieldsFragment => gql`
  mutation($user: String, $userInput: UserInput, $password: String!) {
    loginWithPassword(user: $user, userInput: $userInput, password: $password) {
      sessionId
      ...LoginFields
      user {
        id
        ...UserFields
      }
    }
  }
  
  ${userFieldsFragment}
  ${loginFieldsFragment}
`;
