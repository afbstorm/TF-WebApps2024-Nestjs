import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToInstance } from "class-transformer";

// Interface définissant une new class
interface ClassConstructor {
    new (...args: any[]): {};
}

// Déclare une fonction qui va accepter n'importe quelle classe en paramètre
// Qui va utiliser UseInterceptors pour créer un interceptor NestJs
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    // NestInterceptor est une interface qui va nous permettre de créer des intercepteurs

    constructor(private _dto: ClassConstructor) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // Context est l'entiereté de la request (en express === req)

        // On récupère les informations de la requête, on utilise map de rxjs pour parcourir et afficher ces infos sous le format que l'on a décidé
        return next.handle().pipe(
            map((data: any) => {
                // Data === datas de la requête
                return plainToInstance(this._dto, data, {
                    excludeExtraneousValues: true
                })
                // plainToInstance ➡️ Va transformer des datas sous forme de texte en class
                // this._dto ➡️ la class à quoi les datas doivent ressembler
                // data ➡️ les datas plainText de la requête
                // ExcludeExtraneousValues ➡️ Dans un dto, avec class-transformer, on peut définir 2 décorateurs particuliers qui sont : @Expose et @Exclude
                // ➡️ cette option va vérifier dans le dto passé en paramètre s'il y a des propriétés sous @Exclude. S'il y en a, il ne va pas les utiliser pour transformer
                // ➡️ les datas plainText en class
            })
        )
    }
}
