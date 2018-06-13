import { IResolverContext } from '../types/graphql';
import AccountsServer from '@accounts/server';

export const changePassword = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.IChangePasswordOnMutationArguments,
  ctx: IResolverContext
) => {
  const { oldPassword, newPassword } = args;
  const { user } = ctx;

  if (!(user && user.id)) {
    throw new Error('Unauthorized');
  }

  const userId = user.id;
  const password: any = accountsServer.getServices().password;

  if (!(typeof password.resetPassword === 'function')) {
    throw new Error('Change password is not supported.');
  }

  return password.changePassword(userId, oldPassword, newPassword);
};
