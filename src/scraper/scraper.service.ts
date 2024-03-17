
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as puppeteer from 'puppeteer';
import { Data, ScraperSchema } from './scraper.schema';

@Injectable()
export class ScraperService {
  constructor(@InjectModel('Data') private readonly dataModel: Model<Data>) {}

  async scrapeWebsite(url: string): Promise<any> {

    //pasamos de una url normal a URI
    const encodedUrl = encodeURI(url);

    //lanzamos puppeteer,abrimos pag. nueva, vamos hasta la URL solicitada 
    //y esperamos a que la pág.se cargue casi en su totalidad.
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(encodedUrl, { waitUntil: 'networkidle2' });

    //tomamos los datos solicitados de la URL
    const data = await page.evaluate(() => {
      const title = document.querySelector('h1') ? document.querySelector('h1').innerText : null;
      const imageUrl = document.querySelector('img') ? document.querySelector('img').src : null;
      const text = document.querySelector('p') ? document.querySelector('p').innerText : null;
      return { title, imageUrl, text };
    });
    await browser.close();

  //Guardamos los datos en la DB
    const savedData = await this.createData(url, data.title, data.imageUrl, data.text);
    return savedData;
  }

  async createData(url: string, title?: string, imageUrl?: string, text?: string): Promise<Data> {
    const newData = new this.dataModel({
      url,
      title,
      imageUrl,
      text,
    });
    return newData.save();
  }

  //mostramos un registro solicitado por URL
  async findDataByUrl(url: string): Promise<Data | null> {
    return this.dataModel.findOne({ url }).exec();
}

  //mostramos todos los registros
  async findAll(): Promise<any[]> {
    return this.dataModel.find().exec();
  }

}
