export const loginWithPassword = Accounts =>
  (async (_, { user, userInput, password }) => {
    if (userInput) {
      return await Accounts.loginWithPassword(user, password);
    } else if (user && typeof user === 'string') {
      return await Accounts.loginWithPassword({ username: user }, password);
    }

    throw new Error('Missing user/userInput!');
  });
