import fs from 'fs';
import { promisify } from 'util';
import { firefox } from '@playwright/test';
import { ApiElement } from '../types/type';
const readFileAsync = promisify(fs.readFile);

export async function getjson(): Promise<ApiElement[]> {
  const res = await readFileAsync('./db.json');
  return JSON.parse(res.toString()) as ApiElement[];
}
export function saveJSON(json: ApiElement[]): void {
  const data = JSON.stringify(json);
  // write JSON string to a file
  fs.writeFile('./db.json', data, (err) => {
    if (err) {
      throw err;
    }
  });
}


export async function getSpeed(url: string, match: string): Promise<string[]> {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const htmlstring = await page.content();
  const searchStr = match;
  const indexes = [...htmlstring.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
  const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation')),
  );
  type navigationPeformance = {
    duration: string,
  }
  const navigationTiming = JSON.parse(navigationTimingJson) as navigationPeformance[];
  return [navigationTiming[0].duration, indexes.length.toString()];
}