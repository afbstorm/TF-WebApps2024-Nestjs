import { NestFactory } from '@nestjs/core';
import {OrdinateurModule} from "./ordinateur/ordinateur.module";

async function bootstrap() {
  const app = await NestFactory.create(OrdinateurModule);
  await app.listen(3000);
}
bootstrap();
