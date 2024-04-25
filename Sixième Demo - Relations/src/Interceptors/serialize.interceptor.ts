import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToInstance } from "class-transformer";

// Interface qui va limite le type autorisé aux class.
interface ClassConstructor {
    new (...args: any[]): {}
}

// Permet de créer un décorator qui va faire le travail de cette ligne : @UseInterceptors(new SerializeInterceptor(UserDto))
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: ClassConstructor) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // context est toute la requête (req en express)
        // console.log(context)

        // On récupère les informations de la request, on utilise la fonction map de rxjs pour parcourir et finalement afficher ces informations
        return next.handle().pipe(
            map((data: any) => {
                // data est les datas de la request
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            })
        )
    }
}