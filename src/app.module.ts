import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuppeterService } from './puppeteer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PuppeterService],
})
export class AppModule {}
