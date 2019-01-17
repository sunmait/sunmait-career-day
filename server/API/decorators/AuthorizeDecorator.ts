import { BaseHttpController } from 'inversify-express-utils';
import { Principal } from '../providers/AuthProvider/Principal';
import { UserRoles } from '../../Domain/helpers';

type ArgumentTypes<F> = F extends (...args: infer A) => any ? A : never;

export function authorize(config?: { roles: UserRoles[] }) {
  return <T extends (...args: any) => any>(
    target: BaseHttpController,
    _key: string,
    descriptor: TypedPropertyDescriptor<T>,
  ) => {
    const originalMethod = descriptor.value;
    if (!originalMethod) {
      return descriptor;
    }
    const methodWrapper = async function(this: typeof target, ...args: ArgumentTypes<T>) {
      const user = this.httpContext.user as Principal;

      const isUserAuthorized = await user.isAuthenticated();
      if (!isUserAuthorized) {
        throw { status: 401, message: 'Unauthorized' };
      }

      const isUserAllowedByRole = config ? user.isInRoles(config.roles) : true;
      if (!isUserAllowedByRole) {
        throw { status: 403, message: 'Forbidden' };
      }

      return originalMethod.apply(this, args);
    };
    descriptor.value = methodWrapper as T;
    return descriptor;
  };
}
