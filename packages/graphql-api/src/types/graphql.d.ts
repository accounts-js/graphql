import { UserObjectType } from '@accounts/common';

interface IResolverContext {
  user: UserObjectType;
  authToken: string;
}
