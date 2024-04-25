import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from "./users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {}

    async signup(email: string, password: string) {
        // Check if email exist
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException('Email already exist')
        }

        // Hash user password
        // Generate a salt
        // Return a buffer of 16 characters in binary that we transform in haxadecimal string --> j894fze4zcz85435ze
        const salt = randomBytes(8).toString('hex');


        // Hash the salt and the password together
        // The third argument return the length of the hash
        // In order to help typescript to understand the type of hash we use the syntax " as ... " otherwise it will be of type unknown
        const hash = (await scrypt(password, salt,  32)) as Buffer;

        // Join the hashed result and the salt result together
        // We add a separator to differenciate the hash and the hash in the database
        // toString is to transform the hash into hexadecimal
        const result = salt + '.' + hash.toString('hex')

        // Create new user and save it
        const user = await this.userService.create(email, result);

        // return the user
        return user;
    }

    async signin(email: string, password: string) {
        // Check if email exist
        // Destructuring d'array, on récupère uniquement le résultat correspondant
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new NotFoundException('Email doesn\'t exist');
        }

        // Destructuring du password hash pour récupérer les informations
        const [salt, storedHash] = user.password.split('.');

        // Création d'un nouveau hash avec le password et le salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid password');
        }
        return user;
    }

}
