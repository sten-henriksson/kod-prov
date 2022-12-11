/* eslint-disable max-len */
import { getjson, saveJSON, getSpeed } from './service';
import { ApiElement } from 'types/type';


// testurl

// urls

// search


export async function getUrls(): Promise<ApiElement[]> {
    const json: ApiElement[] = await getjson();
    if (!json.length) {
        const a: ApiElement = { url: "No urls availabe", time: "0", matches: "0", date: "0", keyword: "false" };
        return [a];
    }
    return json.reverse();
}

export async function urlSearch(postUrl: string): Promise<ApiElement[]> {
    const dbResults = await getjson();
    const result = dbResults.filter(({ url }) => url.includes(postUrl));
    return result;
}

export async function testSpeed(url: string, match: string): Promise<ApiElement[]> {
    const bundledPromise = await Promise.all([getSpeed(url, match), getjson()]);
    const speed: string[] = bundledPromise[0];
    const json: ApiElement[] = bundledPromise[1];
    const datetime = new Date();
    const apiele: ApiElement = { url: url, time: speed[0], matches: speed[1], date: datetime.toISOString().slice(0, 10), keyword: match };
    json.push(apiele);
    saveJSON(json);
    return json;
}
