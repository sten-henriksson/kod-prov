import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
import { ApiElement } from '../types/type';
import { getUrls, urlSearch, testSpeed } from './controller';

app.post(`/speedurl`, async (req, res) => {
    //spawns playwright to get speed of url. 
    try {
        type req_body = {
            url: string,
            match: string
        }
        const req_bod = req.body as req_body;
        const url: string = req_bod.url;
        const match: string = req_bod.match;
        const speedReturn: ApiElement[] = await testSpeed(url, match);
        // reverse to get chronolgical order 
        res.json(speedReturn.reverse());
    } catch (error) {
        console.log("error fetching speed", error);
        res.status(400);
    }
});

app.get('/urls', async (req, res) => {
    //fetch array from db.json
    try {
        res.json(await getUrls());
    } catch (error) {
        console.log("cant get data from db", error);
        res.status(400);
    }
});

app.get('/search', async (req, res) => {
    //just filter an array for including text on each element
    try {
        if (req.query?.url != undefined) {
            const reqQuery = req.query?.url.toString();
            res.json(await urlSearch(reqQuery));
        }
    } catch (error) {
        res.status(400);
    }
});

export default app;