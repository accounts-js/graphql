import { IResolverContext } from '../types/graphql';
import AccountsServer from '@accounts/server';

export const sendResetPasswordEmail = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.ISendVerificationEmailOnMutationArguments,
  ctx: IResolverContext
) => {
  const { email } = args;

  const password: any = accountsServer.getServices().password;

  if (!(typeof password.sendResetPasswordEmail === 'function')) {
    throw new Error('Reset password is not supported.');
  }

  return password.sendResetPasswordEmail(email);
};
