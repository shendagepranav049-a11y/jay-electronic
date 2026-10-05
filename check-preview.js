import puppeteer from 'puppeteer';
import { setTimeout } from 'timers/promises';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:4173');
  await setTimeout(2000); // wait for render
  
  const content = await page.content();
  console.log("ROOT CONTENT:", content.substring(0, 1000));
  
  await browser.close();
})();
