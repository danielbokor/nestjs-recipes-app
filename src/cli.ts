import { NestFactory } from '@nestjs/core';
import { CommandFactory } from 'nest-commander'; // Import CommandFactory
import { AppModule } from './app.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  await CommandFactory.run(AppModule, ['warn', 'error']); // Use CommandFactory to run the CLI

  await appContext.close();
}

bootstrap();
