import { AccountsServer } from '@accounts/server';
import { IResolverContext } from '../types/graphql';
import { AccountsPassword } from '@accounts/password';

export const verifyEmail = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.IVerifyEmailOnMutationArguments,
  ctx: IResolverContext
) => {
  const { token } = args;

  const password: any = accountsServer.getServices().password as AccountsPassword;

  if (!(typeof password.verifyEmail === 'function')) {
    throw new Error('Email verification is not supported.');
  }

  return password.verifyEmail(token);
};

export const sendVerificationEmail = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.ISendVerificationEmailOnMutationArguments,
  ctx: IResolverContext
) => {
  const { email } = args;

  const password: any = accountsServer.getServices().password as AccountsPassword;

  if (!(typeof password.sendVerificationEmail === 'function')) {
    throw new Error('Email verification is not supported.');
  }

  return password.sendVerificationEmail(email);
};
