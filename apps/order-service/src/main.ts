import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Order Service')
    .setDescription('The order service API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the Kafka microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'order-service',
        brokers: ['kafka:9092'], // Adjust based on your Kafka setup
      },
      consumer: {
        groupId: 'order-group', // Same group as in the consumer service
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
