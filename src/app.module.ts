import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScraperSchema } from './scraper/scraper.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './scraper/scraper.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: 'Data', schema: ScraperSchema }]),
        DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
