import gql from 'graphql-tag';

export const twoFactorSetMutation = gql`
  mutation twoFactorSet($secret: String!, $code: String!) {
    twoFactorSet(secret: $secret, code: $code)
  }
`;
