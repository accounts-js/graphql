import { AccountsServer } from '@accounts/server';
import { IResolverContext } from '../types/graphql';

export const refreshAccessToken = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.IRefreshTokensOnMutationArguments,
  ctx: IResolverContext
) => {
  const { accessToken, refreshToken } = args;

  // ! No IP and userAgent, using fake ones!
  // TODO: discussion needed
  const ip = '127.0.0.1';
  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36';

  const refreshedSession = await accountsServer.refreshTokens(
    accessToken,
    refreshToken,
    ip,
    userAgent
  );

  return refreshedSession.tokens;
};
