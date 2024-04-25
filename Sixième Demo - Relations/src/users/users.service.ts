import {Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './user.entity';

@Injectable()
export class UsersService {
    //repo: Repository<User>

    // Déclaration de la propriété repo en private ce qui nous évite de déclarer la propriété et assigner sa valeur. En résumé, c'est un raccourci de déclaration
    // Repository<User> veut dire que repo va être une instance de Repository de type User
    // @InjectRepository aide le système d'injection de dépendances a comprendre quelle instance de Repository a besoin d'être injectée
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        // create permet de créer une instance de user dans l'application
        const user = this.repo.create({email, password});

        // save permet de sauvegarder cette instance dans la DB de manière a ce que les données soient persistantes
        return this.repo.save(user);
    }

    // return UN élément ou aucun si rien ne satisfait la demande
    findOne(id: number) {
        // TODO ADD THE SESSION AFTER THE HASHING OF THE PASSWORD
        if (!id) {
            return null;
        }
        return this.repo.findOneBy({ id }) // ( { email: test@gmail.com } )
    }

    // Return un tableau de tous les éléments qui correspondent à l'élément recherché ou un tableau vide si rien ne correspond
    find(email: string) {
        return this.repo.find({where: { email }})
    }

    // Partial<User> permet de donner un argument qui peut comprendre TOUTE la définition de User ou seulement une partie.
    async update(id: number, data: Partial<User>) {
        // insert et update utilise des objects pour envoyer les données a la DB.
        // save utilise une instance de l'object. Ce qui permet une facilité de debug via des hooks (par exemple @AfterUpdate() ou @AfterRemove() dans user.entity)
        // Le problème de save est que nous allons devoir fetch les informations depuis la DB pour pouvoir récupérer cette instance

        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        // Object.assign va récupérer l'intégralité des valeurs du deuxième argument (data) et va les copier dans user en écrasant les données existantes
        Object.assign(user, data);
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return this.repo.remove(user);
    }
}
