import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeterService {
  private puppeterInstance = null;

  constructor() {
    if (this.puppeterInstance) {
      return this.puppeterInstance;
    }

    this.puppeterInstance = this.getInstance();
  }

  async getInstance() {
    return await puppeteer.launch({ headless: 'new' });
  }
}
