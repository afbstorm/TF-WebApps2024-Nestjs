import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {

    // @InjectRepository va aider le sytème d'injection de dépendances de Nestjs à comprendre
    // quelle instance de Repository<User> doit être injectée lors de l'appel du service
    constructor(@InjectRepository(User) private _repo: Repository<User>) {}

    // Create() et Save() créent une nouvelle instance de quelque chose
    // Create() crée une nouvelle instance de qqch mais ne le stocke pas en DB
    // Save() récupérer l'instance du create() ET la stocker en DB
    create(email: string, password: string): Promise<User> {
        const user = this._repo.create({email, password})

        return this._repo.save(user);
    }

    findOne(id: number) {
        // findOneBy de typeorm return UN et UN SEUL élément, ou aucun si rien ne satisfait le condition
        return this._repo.findOneBy({id}) // findOneBy({ where : id = id })
        // Va return {email: ..., password: ...}
    }

    find(email: string) {
        // find de typeorm return un tableau de résultat, ou un tableau vide si rien ne correspond
        return this._repo.find({ where : { email }}) // find({ where: email = email })
    }

    async update(id: number, data: Partial<User>) {
        // Au lieu d'utiliser insert() et update() de typeorm, nous allons fetch l'utilisateur directement depuis la BD
        // Pour ensuite utiliser save() une fois l'utilisateur modifié.
        // L'avantage de save() est que nous allons pouvoir, contrairement a une utilisation d'insert() ou update(), utiliser des hooks de debug
        // Par exemple @AfterUpdate() ou @BeforeUpdate() à utiliser dans user.entity.ts

        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable ou inexistant');
        }

        Object.assign(user, data)
        return this._repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable ou inexistant');
        }

        return this._repo.remove(user);
    }
}
