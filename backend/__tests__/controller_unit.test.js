import { describe, expect, jest, test } from '@jest/globals';
import { testSpeed, getUrls, urlSearch } from '../src/controller'
import { getjson, saveJSON, getSpeed } from '../src/service';
jest.mock("../src/service");


const db = [{
    "url": "url1",
    "time": 2,
    "matches": "match3",
    "date": "date4",
    "keyword": "keyword5"
},
{
    "url": "2",
    "time": 2,
    "matches": "2",
    "date": "2",
    "keyword": "2"
}]
describe('getUrls from db', () => {

    getjson.mockImplementation(() => {
        return db
    });
    test('url res', async () => {
        const geturls = await getUrls();
        expect(geturls).toEqual([
            {
                "url": "2",
                "time": 2,
                "matches": "2",
                "date": "2",
                "keyword": "2"
            },
            {
                "url": "url1",
                "time": 2,
                "matches": "match3",
                "date": "date4",
                "keyword": "keyword5"
            }])
    });
});

describe('url search', () => {
    getjson.mockImplementation(() => {
        return db
    });
    test('search', async () => {
        const serachUrls = await urlSearch("url1");
        expect(serachUrls).toEqual([
            {
                "url": "url1",
                "time": 2,
                "matches": "match3",
                "date": "date4",
                "keyword": "keyword5"
            }])
    });
});

describe('test speed', () => {
    getSpeed.mockImplementation(() => {
        return ["1","string2"]
    });
    getjson.mockImplementation(() => {
        return db
    });
    test('test speed', async () => {
        const serachUrls = await testSpeed("https://facebook.com", "password?");
        expect(serachUrls[2].url).toEqual("https://facebook.com")
        expect(serachUrls[2].keyword).toEqual("password?")
    });
});