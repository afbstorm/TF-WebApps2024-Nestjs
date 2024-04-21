import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import {MessagesModule} from "./messages/messages.module";

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  // Permet l'utilisation GLOBALE des pipes (class-validator, class-transformer, ...)
  // par le serveur Nestjs
  app.useGlobalPipes(
      new ValidationPipe()
  )
  await app.listen(3000);
}
bootstrap();
