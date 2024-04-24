import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // Nous allons utiliser le userId de session pour voir si l'utilisateur est bel et bien connecté
    // switchToHttp : Récupère le context en HTTP
    // getRequest : Récupère la requête depuis l'HTTP
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
