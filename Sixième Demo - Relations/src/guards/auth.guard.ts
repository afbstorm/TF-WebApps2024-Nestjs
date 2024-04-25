import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // Nous allons utiliser le userId de session pour voir si le user est bien log
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
