import { Injectable } from '@nestjs/common';
import {MessagesRepository} from "./messages.repository";

// interface Repository {
//     findOne(id: string),
//     findAll(),
//     create(content: string)
// }

@Injectable()
export class MessagesService {

    // Façon la plus optimale de faire une injection de dépendance
    // messageRepo: Repository;
    // constructor(repo: Repository) {
    //     this.messageRepo = repo
    // }

    // < -------------- >

    // NE PAS FAIRE CAR CREATION D INJECTION CYCLIQUE ET DONC REDONDANCE
    // SERVEUR PAS AIMER
    // messageRepo: MessagesRepository;
    //
    // constructor(messageRepo: MessagesRepository) {
    //
    //     this.messageRepo = new MessagesRepository();
    //     // this.messageRepo = messageRepo;
    // }


    constructor(public messageRepo: MessagesRepository) {}



    findOne(id: string) {
        return this.messageRepo.findOne(id);
    }

    findAll() {
        return this.messageRepo.findAll();
    }

    create(content: string) {
        return this.messageRepo.create(content);
    }
}
