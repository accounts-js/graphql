import { TransportInterface, AccountsClient } from '@accounts/client';
import { CreateUser, LoginResult, ImpersonationResult } from '@accounts/types';
import { createUserMutation } from './graphql/create-user.mutation';
import { loginWithServiceMutation } from './graphql/login-with-service.mutation';

export interface IAuthenticateParams {
  [key: string]: string | object;
}

export interface IOptionsType {
  graphQLClient: any;
  userFieldsFragment?: string;
}

export default class GraphQLClient implements TransportInterface {
  public client: AccountsClient;
  private options: IOptionsType;

  constructor(options: IOptionsType) {
    this.options = options;
  }

  /**
   * Create a user with basic user info
   *
   * @param {CreateUser} user user object
   * @returns {Promise<string>} user's ID
   * @memberof GraphQLClient
   */
  public async createUser(user: CreateUser): Promise<string> {
    return this.mutate(createUserMutation, 'register', { user });
  }

  /**
   * Login with a service, the service is registered on the server using
   *
   * ```ts
   * const accountsServices = {
   *   password: new AccountsPassword(),
   *   //...other services
   * };
   * new AccountsServer(accountsServerOptions, accountsServices);
   * ```
   *
   * For example, password authentication, you can use this method like this
   *
   * ```ts
   * await loginWithService('password', { user: { email: 'xx@xx.xx' }, password: 'xxx' });
   * ```
   *
   * or, more suggested way is to use '@accounts/client-password'
   *
   * ```ts
   * import { AccountsClientPassword } from '@accounts/client-password';
   * const accountsPassword = new AccountsClientPassword(accountsClient);
   *
   * await accountsPassword.login({
   *   user: {
   *     email: this.state.email,
   *   },
   *   password: this.state.password,
   *   code: this.state.code,
   * });
   * ```
   *
   * @param {string} service service name, for example password.
   * @param {IAuthenticateParams} authenticateParams authentication params, see GraphiQL authenticate mutation
   * @returns {Promise<LoginResult>} LoginResult
   * @memberof GraphQLClient
   */
  public async loginWithService(
    service: string,
    authenticateParams: IAuthenticateParams
  ): Promise<LoginResult> {
    return this.mutate(loginWithServiceMutation, 'authenticate', {
      serviceName: service,
      params: authenticateParams,
    });
  }
  public async logout(accessToken: string): Promise<void> {
    // TODO:
  }
  public async refreshTokens(accessToken: string, refreshToken: string): Promise<LoginResult> {
    // TODO:
    return;
  }
  public async verifyEmail(token: string): Promise<void> {
    // TODO:
  }
  public async sendResetPasswordEmail(email: string): Promise<void> {
    // TODO:
  }
  public async sendVerificationEmail(email: string): Promise<void> {
    // TODO:
  }
  public async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO:
  }
  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    // TODO:
  }
  public async getTwoFactorSecret(customHeaders?: object): Promise<any> {
    // TODO:
  }

  public async twoFactorSet(secret: any, code: string, customHeaders?: object): Promise<void> {
    // TODO:
  }

  public async twoFactorUnset(code: string, customHeaders?: object): Promise<void> {
    // TODO:
  }

  public async impersonate(
    token: string,
    impersonated: {
      userId?: string;
      username?: string;
      email?: string;
    }
  ): Promise<ImpersonationResult> {
    // TODO:
    return;
  }

  private async mutate(mutation, resultField, variables) {
    return this.options.graphQLClient
      .mutate({
        mutation,
        variables,
      })
      .then(({ data }) => data[resultField])
      .catch(e => {
        throw new Error(e.message);
      });
  }

  private async query(query, resultField, variables) {
    return this.options.graphQLClient
      .query({
        query,
        variables,
      })
      .then(({ data }) => data[resultField])
      .catch(e => {
        throw new Error(e.message);
      });
  }
}
