import { IResolverContext } from '../types/graphql';
import AccountsServer from '@accounts/server';
import { AccountsPassword } from '@accounts/password';

export const sendResetPasswordEmail = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.ISendVerificationEmailOnMutationArguments,
  ctx: IResolverContext
) => {
  const { email } = args;

  const password: any = accountsServer.getServices().password as AccountsPassword;

  if (!(typeof password.sendResetPasswordEmail === 'function')) {
    throw new Error('Reset password is not supported.');
  }

  return password.sendResetPasswordEmail(email);
};
