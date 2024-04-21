import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import {RegisterUserDto} from "../DTOs/register-user.dto";
import {UpdateUserDto} from "../DTOs/update-user.dto";

@Injectable()
export class UserRepository {

    async create(user: RegisterUserDto) {
        const users = await readFile('users.json', 'utf-8')
        const usersParsed = users ? JSON.parse(users) : {}
        const id = uuidv4();

        usersParsed[id] = {id, ...user}

        await writeFile('users.json', JSON.stringify(usersParsed))
    }

    async findAll() {
        const users = await readFile('users.json', 'utf-8')
        return users ? JSON.parse(users) : {}
    }

    async update(id: string, content: UpdateUserDto) {
        const users = await readFile('users.json', 'utf-8')
        const usersParsed = users ? JSON.parse(users) : {}
        if (usersParsed[id]) {
            usersParsed[id] = {...content}
        }

        await writeFile('users.json', JSON.stringify(usersParsed))
        return await readFile('users.json', 'utf-8')
    }

    async updatePartial(id: string, content: Partial<UpdateUserDto>) {
        const users = await readFile('users.json', 'utf-8')
        const usersParsed = users ? JSON.parse(users) : {}
        if (usersParsed[id]) {
            usersParsed[id] = Object.assign(usersParsed[id], content)
        }

        await writeFile('users.json', JSON.stringify(usersParsed))
        return await readFile('users.json', 'utf-8')
    }

    async delete(id: string) {
        const users = await readFile('users.json', 'utf-8')
        const usersParsed = users ? JSON.parse(users) : {}
        const usersUpdated = usersParsed.filter(user => user.id !== id)

        await writeFile('users.json', JSON.stringify(usersUpdated))
    }

}
