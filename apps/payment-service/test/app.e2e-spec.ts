import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('/graphql (POST) createOrder', () => {
    return request(server)
      .post('/graphql')
      .send({
        query: `mutation {
          createOrder(data: { customer_id: "1", restaurant_id: "2", address_id: "3", orderTotal: 10.5 }) {
            id
          }
        }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createOrder.id).toBeDefined();
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
