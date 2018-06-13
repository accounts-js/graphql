export const mutations = `
  impersonate(accessToken: String!, username: String!): ImpersonateReturn
  refreshTokens(accessToken: String!, refreshToken: String!): LoginReturn
  logout(accessToken: String!): Boolean
  authenticate(serviceName: String!, params: AuthenticateParamsInput!): LoginReturn

  # register returns the id corresponding db ids, such as number IDs, ObjectIDs or UUIDs
  register(user: CreateUserInput!): ID
  verifyEmail(token: String!): Boolean
  resetPassword(token: String!, newPassword: String!): Boolean
  sendVerificationEmail(email: String!): Boolean
  sendResetPasswordEmail(email: String!): Boolean
  changePassword(oldPassword: String!, newPassword: String!): Boolean
  twoFactorSet(secret: String!, code: String!): Boolean
  twoFactorUnset(code: String!): Boolean
`;
