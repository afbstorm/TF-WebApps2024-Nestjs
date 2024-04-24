import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

// Le but de cet interceptor est de récupéré toute requête
// De vérifier s'il existe un objet userId dans la session
// S'il existe on récupère les informations de cet utilisateur
// On les stocke dans un nouvel objet currentUser dans la session
// Ce qui permet à notre décorateur CurrentUser de récupérer cet objet lorsqu'il est appelé
// Sur une route HTTP

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private _userService: UsersService) {}

  // Les paramètres, sont des variables formelles et non réelles. Ils peuvent être nommés comme bon vous semble,
  // TANT QUE la définition de type est présente pour spécifier ce qu'ils sont
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this._userService.findOne(userId);
      // Une fois l'utilisateur trouvé, on stocke ses informations dans un cookie de session
      request.currentUser = user;
    }

    return handler.handle();
  }
}
