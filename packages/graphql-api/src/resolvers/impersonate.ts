import { AccountsServer } from '@accounts/server';
import { ImpersonationResult } from '@accounts/types';
import { IResolverContext } from '../types/graphql';

export const impersonate = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.IImpersonateOnMutationArguments,
  ctx: IResolverContext
) => {
  const { accessToken, username } = args;

  // ! No IP and userAgent, using fake ones!
  // TODO: discussion needed
  const ip = '127.0.0.1';
  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36';

  const impersonateRes: ImpersonationResult = await accountsServer.impersonate(
    accessToken,
    { username },
    ip,
    userAgent
  );

  // So ctx.user can be used in subsequent queries / mutations
  if (impersonateRes && impersonateRes.user) {
    ctx.user = impersonateRes.user;
    ctx.authToken = impersonateRes.tokens.accessToken;
  }

  return impersonateRes;
};
