import { IResolverContext } from '../types/graphql';
import AccountsServer from '@accounts/server';
import { AccountsPassword } from '@accounts/password';

export const twoFactorSecret = (accountsServer: AccountsServer) => async (
  _,
  args: {},
  ctx: IResolverContext
) => {
  const { user } = ctx;

  // Make sure user is logged in
  if (!(user && user.id)) {
    throw new Error('Unauthorized');
  }

  const password: any = accountsServer.getServices().password as AccountsPassword;

  if (!(typeof password.resetPassword === 'function')) {
    throw new Error('Change password is not supported.');
  }

  return password.twoFactor.getNewAuthSecret();
};

export const twoFactorSet = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.ITwoFactorSetOnMutationArguments,
  ctx: IResolverContext
) => {
  const { code, secret } = args;
  const { user } = ctx;

  // Make sure user is logged in
  if (!(user && user.id)) {
    throw new Error('Unauthorized');
  }

  const userId = user.id;
  const password: any = accountsServer.getServices().password as AccountsPassword;

  if (!(password && password.twoFactor && typeof password.twoFactor.set === 'function')) {
    throw new Error('Set two factor is not supported.');
  }

  return password.twoFactor.set(userId, secret, code);
};

export const twoFactorUnset = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.ITwoFactorUnsetOnMutationArguments,
  ctx: IResolverContext
) => {
  const { code } = args;
  const { user } = ctx;

  // Make sure user is logged in
  if (!(user && user.id)) {
    throw new Error('Unauthorized');
  }

  const userId = user.id;
  const password: any = accountsServer.getServices().password as AccountsPassword;

  if (!(password && password.twoFactor && typeof password.twoFactor.unset === 'function')) {
    throw new Error('Unset two factor is not supported.');
  }

  await password.twoFactor.unset(userId, code);
};
