import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Le but de ce décorateur est d'afficher au client les informations
// Du user courant. Ces informations sont récupérées depuis l'objet currentUser
// De la requête HTTP gràce a l'intercepteur CurrentUser

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
