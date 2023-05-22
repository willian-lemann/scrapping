import { Injectable } from '@nestjs/common';
import { PuppeterService } from './puppeteer.service';

@Injectable()
export class AppService {
  constructor(private readonly puppeterService: PuppeterService) {}

  async getRealEstateData(): Promise<any> {
    const browser = await this.puppeterService.getInstance();

    const page = await browser.newPage();
    await page.goto('https://imobiliariajefersonealba.com.br/alugueis/imoveis');

    const imoveis = await page.evaluate(() => {
      const imoveis = [];

      const imovelElements = document.querySelectorAll('.col-imovel');
      imovelElements.forEach((element) => {
        const image = element.querySelector(
          '.box-imovel-image img',
        ) as HTMLImageElement;

        const imovel = {
          title: element
            .querySelector('.box-imovel-infos .--type')
            .textContent.trim(),
          price: element
            .querySelector('.box-imovel-infos .--price')
            .textContent.trim(),
          location: element
            .querySelector('.box-imovel-infos .--location')
            .textContent.trim(),
          code: element
            .querySelector('.box-imovel-bottom .--code')
            .textContent.trim(),
          image: image.src.trim(),
        };

        imoveis.push(imovel);
      });

      return imoveis;
    });

    await browser.close();

    return imoveis;
  }
}
