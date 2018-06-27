import { AccountsServer } from '@accounts/server';

import { refreshAccessToken } from './resolvers/refresh-tokens';
import { impersonate } from './resolvers/impersonate';
import { getUser } from './resolvers/get-user';
import { User } from './resolvers/user';
import { mutations } from './graphql/mutations';
import { typeDefs } from './graphql/types';
import { queries } from './graphql/queries';
import { logout } from './resolvers/logout';
import { registerPassword } from './resolvers/register-user';
import { resetPassword } from './resolvers/reset-password';
import { sendResetPasswordEmail } from './resolvers/send-reset-password-email';
import { verifyEmail, sendVerificationEmail } from './resolvers/verify-email';
import { serviceAuthenticate } from './resolvers/authenticate';
import { changePassword } from './resolvers/change-password';
import { twoFactorSet, twoFactorUnset, twoFactorSecret } from './resolvers/two-factor';

export interface SchemaGenerationOptions {
  rootQueryName?: string;
  rootMutationName?: string;
  extend?: boolean;
  withSchemaDefinition?: boolean;
}

export const createJSAccountsGraphQL = (
  accountsServer: AccountsServer,
  schemaOptions?: SchemaGenerationOptions
) => {
  // Apply default values
  schemaOptions = {
    rootQueryName: schemaOptions.rootQueryName || 'Query',
    rootMutationName: schemaOptions.rootMutationName || 'Mutation',
    extend: schemaOptions.extend !== undefined ? schemaOptions.extend : true,
    withSchemaDefinition:
      schemaOptions.withSchemaDefinition !== undefined ? schemaOptions.withSchemaDefinition : false,
  };

  const schema = `
  ${typeDefs}

  ${schemaOptions.extend ? 'extend ' : ''}type ${schemaOptions.rootQueryName} {
    ${queries}
  }

  ${schemaOptions.extend ? 'extend ' : ''}type ${schemaOptions.rootMutationName} {
    ${mutations}
  }

  ${
    schemaOptions.withSchemaDefinition
      ? `schema {
    query: ${schemaOptions.rootMutationName}
    mutation: ${schemaOptions.rootQueryName}
  }`
      : ''
  }
  `;

  const resolvers = {
    User,
    [schemaOptions.rootMutationName]: {
      impersonate: impersonate(accountsServer),
      refreshTokens: refreshAccessToken(accountsServer),
      logout: logout(accountsServer),
      // 3rd-party services authentication
      authenticate: serviceAuthenticate(accountsServer),

      // @accounts/password
      register: registerPassword(accountsServer),
      verifyEmail: verifyEmail(accountsServer),
      resetPassword: resetPassword(accountsServer),
      sendVerificationEmail: sendVerificationEmail(accountsServer),
      sendResetPasswordEmail: sendResetPasswordEmail(accountsServer),
      changePassword: changePassword(accountsServer),

      // Two factor
      twoFactorSet: twoFactorSet(accountsServer),
      twoFactorUnset: twoFactorUnset(accountsServer),

      // TODO: OAuth callback endpoint
    },
    [schemaOptions.rootQueryName]: {
      getUser: getUser(accountsServer),
      twoFactorSecret: twoFactorSecret(accountsServer),
    },
  };

  return {
    schema,
    resolvers,
    extendWithResolvers: resolversObject => [...resolversObject, resolvers],
  };
};
