import { AccountsServer } from '@accounts/server';
import { ImpersonateReturnType } from '@accounts/common';

export const impersonate = (accountsServer: AccountsServer) =>
  async (_, args, ctx) => {
    const { accessToken, username } = args;

    // ! No IP and userAgent, using fake ones!
    // TODO: discussion needed
    const ip = '127.0.0.1';
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'

    const impersonateRes: ImpersonateReturnType = await accountsServer.impersonate(accessToken, username, ip, userAgent);

    // So ctx.user can be used in subsequent queries / mutations
    if (impersonateRes && impersonateRes.user) {
      ctx.user = impersonateRes.user;
      ctx.authToken = impersonateRes.tokens.accessToken;
    }

    return impersonateRes;
  };



export const refreshTokens = Accounts =>
  async (_, args, context) => {
    const { accessToken, refreshToken } = args;
    const result = await Accounts.refreshTokens(accessToken, refreshToken);

    if (result && result.user) {
      context.user = result.user;
    }

    return result;
  };
