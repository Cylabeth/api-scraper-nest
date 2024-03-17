import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
    constructor(private readonly scraperService: ScraperService) {}
    @Get('scrape')
    async scrape(@Query('url') url: string): Promise<any> {
    return this.scraperService.scrapeWebsite(url);
    }

    @Get('data')
    async findAll() {
    return this.scraperService.findAll();
    }

    @Get('fetch')
    async fetchUrlInfo(@Query('url') url: string): Promise<any> {
        const result = await this.scraperService.findDataByUrl(url);
        if (!result) {
            throw new NotFoundException('URL data not found in DB');
        }
        return result;
    }

}
