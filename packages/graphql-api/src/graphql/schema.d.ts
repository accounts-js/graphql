// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IMutation | IQuery;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IMutation {
    __typename: 'Mutation';
    loginWithPassword: ILoginReturn | null;
    refreshTokens: ILoginReturn | null;
    logout: boolean | null;
    impersonate: IImpersonateReturn | null;
    createUser: boolean | null;
    verifyEmail: boolean | null;
    resetPassword: boolean | null;
    sendVerificationEmail: boolean | null;
    sendResetPasswordEmail: boolean | null;
  }

  interface ILoginWithPasswordOnMutationArguments {
    user?: string | null;
    userFields?: IUserInput | null;
    password: string;
  }

  interface IRefreshTokensOnMutationArguments {
    accessToken: string;
    refreshToken: string;
  }

  interface ILogoutOnMutationArguments {
    accessToken: string;
  }

  interface IImpersonateOnMutationArguments {
    accessToken: string;
    username: string;
  }

  interface ICreateUserOnMutationArguments {
    user: ICreateUserInput;
  }

  interface IVerifyEmailOnMutationArguments {
    token: string;
  }

  interface IResetPasswordOnMutationArguments {
    token: string;
    newPassword: string;
  }

  interface ISendVerificationEmailOnMutationArguments {
    email: string;
  }

  interface ISendResetPasswordEmailOnMutationArguments {
    email: string;
  }

  interface IUserInput {
    id?: string | null;
    email?: string | null;
    username?: string | null;
  }

  interface ILoginReturn {
    __typename: 'LoginReturn';
    sessionId: string | null;
    user: IUser | null;
    tokens: ITokens | null;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string | null;
    username: string | null;
  }

  interface ITokens {
    __typename: 'Tokens';
    refreshToken: string | null;
    accessToken: string | null;
  }

  interface IImpersonateReturn {
    __typename: 'ImpersonateReturn';
    authorized: boolean | null;
    tokens: ITokens | null;
    user: IUser | null;
  }

  interface ICreateUserInput {
    username?: string | null;
    email?: string | null;
    password?: string | null;
    profile?: ICreateUserProfileInput | null;
  }

  interface ICreateUserProfileInput {
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  }

  interface IQuery {
    __typename: 'Query';
    me: IUser | null;
  }

  interface IPasswordType {
    __typename: 'PasswordType';
    digest: string | null;
    algorithm: string | null;
  }

  interface IPasswordInput {
    digest?: string | null;
    algorithm?: string | null;
  }
}

// tslint:enable
