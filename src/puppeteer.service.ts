import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';

import chromium from 'chrome-aws-lambda';

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
    let instancePuppeteer;

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      instancePuppeteer = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } else {
      instancePuppeteer = await puppeteer.launch({ headless: 'new' });
    }

    return instancePuppeteer as puppeteer.Browser;
  }
}
