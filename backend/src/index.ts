
import express from 'express'
import { getjson, saveJSON, getSpeed } from './service'

const app = express()
app.use(express.json())
type ApiElement = {
    url: String,
    time: String,
    date: String
}
app.post(`/speedurl`, async (req, res) => {
    console.log(req.body);

    try {
        // run await in parrarel
        const bundledPromise = await Promise.all([getSpeed(req.body.url), getjson()]);
        const speed = bundledPromise[0]
        let json = bundledPromise[1]
        const apiele: ApiElement = { url: req.body.url, time: speed, date: "123" }
        json.push(apiele);
        // save to local db
        saveJSON(json);
        res.sendStatus(200)
    } catch (error) {
        console.log("error fetching speed", error);
        res.status(400)
    }
})

app.get('/urls', async (req, res) => {
    try {
        res.json(await getjson())
    } catch (error) {
        console.log("cant get data from db", error);
        res.status(400)
    }
});

app.listen(process.env.PORT || 1339, () => {
    console.log(`Example app listening on port ${process.env.PORT || 1339}`);
});

// const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

