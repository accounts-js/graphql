import { AccountsServer } from '@accounts/server';
import { IResolverContext } from '../types/graphql';

export const registerPassword = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.IRegisterOnMutationArguments,
  ctx: IResolverContext
) => {
  const { user } = args;

  const password: any = accountsServer.getServices().password;

  if (!(typeof password.resetPassword === 'function')) {
    throw new Error('Register user with password is not supported.');
  }

  const userId = await password.createUser(user);

  return userId;
};
