import { AccountsServer } from "@accounts/server";
import { loginWithPassword } from "./resolvers/login-with-password";
import { refreshTokens } from "./resolvers/refresh-tokens";
import { impersonate } from "./resolvers/impersonate";
import { me } from "./resolvers/me";
import { User } from "./resolvers/user";
import { mutations } from "./graphql/mutations";
import { typeDefs } from "./graphql/types";
import { queries } from "./graphql/queries";
import { logout } from "./resolvers/logout";
import { createUser } from "./resolvers/create-user";
import { resetPassword } from "./resolvers/reset-password";
import { sendResetPasswordEmail } from "./resolvers/send-reset-password-email";
import { sendVerificationEmail } from "./resolvers/send-verification-email";
import { verifyEmail } from "./resolvers/verify-email";
import * as merge from "deepmerge";

export interface SchemaGenerationOptions {
  rootQueryName: string;
  rootMutationName: string;
  extend: boolean;
  withSchemaDefinition: boolean;
}

const defaultSchemaOptions = {
  rootQueryName: "Query",
  rootMutationName: "Mutation",
  extend: true,
  withSchemaDefinition: false
};

export const createJSAccountsGraphQL = (
  accountsServer: AccountsServer,
  schemaOptions: SchemaGenerationOptions = defaultSchemaOptions
) => {
  const schema = `
  ${typeDefs}

  ${schemaOptions.extend ? "extend " : ""}type ${schemaOptions.rootQueryName} {
    ${queries}
  }

  ${schemaOptions.extend ? "extend " : ""}type ${
    schemaOptions.rootMutationName
  } {
    ${mutations}
  }

  ${
    schemaOptions.withSchemaDefinition
      ? `schema {
    query: ${schemaOptions.rootMutationName}
    mutation: ${schemaOptions.rootQueryName}
  }`
      : ""
  }
  `;

  const resolvers = {
    User,
    [schemaOptions.rootMutationName]: {
      impersonate: impersonate(accountsServer),
      refreshTokens: refreshTokens(accountsServer),
      logout: logout(accountsServer),
      // all kinds of login (authenticate)
      authenticate: serviceAuthenticate(accountsServer),

      // @accounts/password
      register: registerUser(accountsServer),
      verifyEmail: verifyEmail(accountsServer),
      resetPassword: resetPassword(accountsServer),
      sendVerificationEmail: sendVerificationEmail(accountsServer),
      sendResetPasswordEmail: sendResetPasswordEmail(accountsServer),
      changePassword: changePassword(accountsServer),

      // Two factor
      twoFactorSet: twoFactorSet(accountsServer),
      twoFactorUnset: twoFactorUnset(accountsServer)

      // TODO: OAuth
    },
    [schemaOptions.rootQueryName]: {
      me: getUser(accountsServer),
      twoFactorSecret: twoFactorSecret(accountsServer)
    }
  };

  return {
    schema,
    extendWithResolvers: resolversObject => [...resolversObject, resolvers]
  };
};
