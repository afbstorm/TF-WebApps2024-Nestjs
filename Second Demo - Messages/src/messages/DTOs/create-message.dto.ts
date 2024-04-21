import { IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString() // Un pipe de validation
    content: string;
}
