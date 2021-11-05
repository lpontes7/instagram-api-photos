import { Test, TestingModule } from '@nestjs/testing';
import { InstagramController } from '../instagram.controller';
import { InstagramService } from '../instagram.service';

describe('AppController', () => {
  let appController: InstagramController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ InstagramController],
      providers: [ InstagramService],
    }).compile();

    appController = app.get<InstagramController>(InstagramController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
