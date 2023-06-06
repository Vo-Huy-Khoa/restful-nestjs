/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('E-commerce Website API Documentation')
    .setDescription(
      'This Swagger API documentation provides a comprehensive guide to the RESTful APIs used in our e-commerce website, facilitating seamless integration and development of applications and services. Explore the available endpoints, their functionalities, and the expected request and response formats to leverage the power of our platform in building innovative e-commerce solutions.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
