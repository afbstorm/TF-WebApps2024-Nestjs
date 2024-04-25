import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
// TODO ADD THE SESSION AFTER THE HASHING OF THE PASSWORD
const cookieSesison = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO ADD THE SESSION AFTER THE HASHING OF THE PASSWORD
  app.use(cookieSesison({
      keys: ['fzefjzo'] // N'importe quel string. Sert de clé pour crypter les cookies
  }))
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
  )
  await app.listen(3000);
}
bootstrap();
