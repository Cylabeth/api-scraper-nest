import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScraperSchema } from './scraper.schema';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: ScraperSchema }])],
  providers: [ScraperService],
  controllers: [ScraperController],
  exports: [ScraperService],
})
export class DataModule {}
