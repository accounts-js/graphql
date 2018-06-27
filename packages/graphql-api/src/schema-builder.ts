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

const defaultSchemaOptions = {
  rootQueryName: 'Query',
  rootMutationName: 'Mutation',
  extend: true,
  withSchemaDefinition: false,
};

export const createJSAccountsGraphQL = (
  accountsServer: AccountsServer,
  schemaOptions?: SchemaGenerationOptions
) => {
  // Apply default values
  const {
    rootQueryName = defaultSchemaOptions.rootQueryName,
    rootMutationName = defaultSchemaOptions.rootMutationName,
    extend = defaultSchemaOptions.extend,
    withSchemaDefinition = defaultSchemaOptions.withSchemaDefinition,
  } =
    schemaOptions || {};
  const options = { rootQueryName, rootMutationName, extend, withSchemaDefinition };

  const schema = `
  ${typeDefs}

  ${options.extend ? 'extend ' : ''}type ${options.rootQueryName} {
    ${queries}
  }

  ${options.extend ? 'extend ' : ''}type ${options.rootMutationName} {
    ${mutations}
  }

  ${
    options.withSchemaDefinition
      ? `schema {
    query: ${options.rootMutationName}
    mutation: ${options.rootQueryName}
  }`
      : ''
  }
  `;

  const resolvers = {
    User,
    [options.rootMutationName]: {
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
    [options.rootQueryName]: {
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
