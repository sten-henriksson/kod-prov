import express from 'express';
import { getjson, saveJSON, getSpeed } from './service';
import cors from 'cors';
import { ApiElement } from '../types/type';
const app = express();
app.use(express.json());
app.use(cors());
app.post(`/speedurl`, async (req, res) => {
  try {
    const bundledPromise = await Promise.all([getSpeed(req.body.url), getjson()]);
    const speed = bundledPromise[0];
    const json = bundledPromise[1];
    const datetime = new Date();
    const apiele: ApiElement = { url: req.body.url, time: speed, date: datetime.toISOString().slice(0, 10) };
    json.push(apiele);
    saveJSON(json);
    // reverse to get chronolgical order 
    res.json(json.reverse());
  } catch (error) {
    console.log("error fetching speed", error);
    res.status(400);
  }
});

app.get('/urls', async (req, res) => {
  try {
    res.json((await getjson()).reverse());
  } catch (error) {
    console.log("cant get data from db", error);
    res.status(400);
  }
});
app.get('/search', async (req, res) => {
  try {

    const dbResults = await getjson();
    if (req.query?.url != undefined) {
      const reqQuery = req.query?.url.toString();
      const result = dbResults.filter(({ url }) => url.includes(reqQuery));
      res.json(result);
    }
  } catch (error) {

    res.status(400);
  }
});
app.listen(process.env.PORT || 1339, () => {
  console.log(`Example app listening on port ${process.env.PORT || 1339}`);
});

// const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

