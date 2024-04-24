import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
// randomBytes va servir a créer un morceau binaire d'une longueur que l'on spécifie et qu'il faudra traduire
// _scrypt va servir a hasher une information --> il renvoi un callback
import { promisify } from 'util';
// promisify va transformer un callback en promise

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private _userService: UsersService) {}

  // Register
  async signup(email: string, password: string) {
    // Vérification de l'existence du user
    const users = await this._userService.find(email);
    if (users.length) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }

    // Hash du password

    // Création du salt de minimum 16 bytes
    // randomBytes : va return un buffer de la taille indiquée doublée (8 ::> 16)
    // Nous allons devoir le transformer en un string hexadécimal --> g22v0re4fez6fz8e
    const salt = randomBytes(8).toString('hex');

    // Combiner le salt et le password pour créer le hash
    // Premier argument : le password
    // Deuxième argument : le salt
    // Troisième argument : la taille désirée pour le hash
    // Pour aider typescript a comprendre de quel type il s'agit, on va devoir utiliser " as "
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Combiner le hash et le salt, séparés par un .
    // On sépare par un . pour plus facilement différencier le hash du salt dans la DB et plus facilement destructuré plus tard
    // La transformation en string se fait en hexadécimal
    const result = salt + '.' + hash.toString('hex');

    const user = await this._userService.create(email, result);

    return user;
  }

  // Login
  async signin(email: string, password: string) {
    // Vérification de l'existance du user
    // Destructuring d'array, on récupère uniquement le résultat correspondant à la condition envoyée au userService
    const [user] = await this._userService.find(email);
    if (!user) {
      throw new NotFoundException('This account does not exists');
    }

    // Destructuration du password hash stocké dans la DB pour récupérer les deux informations (salt, hash)
    const [salt, storedHash] = user.password.split('.');

    // Création d'un nouveau hash avec le password et le salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
