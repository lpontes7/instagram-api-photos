import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { InstagramModule } from './intagram/instagram.module';

@Module({
  imports: [ConfigModule, InstagramModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
