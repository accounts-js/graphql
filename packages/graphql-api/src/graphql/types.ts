export const typeDefs = `
  type Tokens {
    refreshToken: String
    accessToken: String
  }

  type LoginResult {
    sessionId: String
    tokens: Tokens
  }

  type ImpersonateReturn {
    authorized: Boolean
    tokens: Tokens
    user: User
  }

  type User {
    id: ID!
    email: String
    username: String
  }

  input UserInput {
    id: ID
    email: String
    username: String
  }

  input CreateUserInput {
    username: String
    email: String
    password: String
    profile: CreateUserProfileInput
  }

  input CreateUserProfileInput {
    name: String
    firstName: String
    lastName: String
  }

  input AuthenticateParamsInput {
    # Twitter, Instagram
    access_token: String
    # Twitter
    access_token_secret: String
    # OAuth
    provider: String
    # Password
    password: String
    # Password
    user: UserInput
    # Two factor
    code: String
  }
`;
