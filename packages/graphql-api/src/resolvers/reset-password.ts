import { AccountsServer } from '@accounts/server';
import { IResolverContext } from '../types/graphql';

export const resetPassword = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.IResetPasswordOnMutationArguments,
  ctx: IResolverContext
) => {
  const { token, newPassword } = args;

  const password: any = accountsServer.getServices().password;

  if (!(typeof password.resetPassword === 'function')) {
    throw new Error('Reset password is not supported.');
  }

  return password.resetPassword(token, newPassword);
};
