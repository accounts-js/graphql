import gql from 'graphql-tag';

export const getTwoFactorSecretQuery = gql`
  query {
    twoFactorSecret
  }
`;
