import { Controller, Body, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { MessagesService } from "./messages.service";
import {CreateMessageDto} from "./DTOs/create-message.dto";


@Controller('/messages')
export class MessagesController {

    constructor(public messageService: MessagesService) {}

    @Get()
    listMessages() {
        return this.messageService.findAll();
    }

    @Post()
    createMessage(@Body() bodyMessageContent: CreateMessageDto) {
        return this.messageService.create(bodyMessageContent.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messageService.findOne(id);
        if (!message) {
            throw new NotFoundException('Message introuvable ou inexistant')
        }
        return message;
    }


}
