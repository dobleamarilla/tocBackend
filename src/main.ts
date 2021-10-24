import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: true,
    credentials: true
  }});
  // app.enableCors();
  await app.listen(3000);
}
bootstrap();
