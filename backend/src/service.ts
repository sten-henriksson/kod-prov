import fs from 'fs';
import { promisify } from 'util'
import { webkit } from '@playwright/test'
const readFileAsync = promisify(fs.readFile)

export async function getjson(): Promise<string[]> {
    const res = await readFileAsync('../db.json')
    return JSON.parse(res.toString());
}
export async function saveJSON(json: any) {
    const data = JSON.stringify(json);
    // write JSON string to a file
    fs.writeFile('./config.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}


export async function getSpeed(url: string): Promise<string> {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
    )
    const navigationTiming = JSON.parse(navigationTimingJson)
    return navigationTiming[0].duration
}