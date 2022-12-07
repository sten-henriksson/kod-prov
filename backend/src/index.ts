
import express from 'express'
import { getjson, saveJSON, getSpeed } from './service'

const app = express()
app.use(express.json())
app.post(`/scrapedata`, async (req, res) => {

    try {
        // run await in parrarel
        const bundledPromise = await Promise.all([getSpeed(req.body.url), getjson()]);
        const speed = bundledPromise[0]
        let json = bundledPromise[1]
        json.push(speed);
        // save to local db
        saveJSON(json);
        res.sendStatus(200)
    } catch (error) {
        console.log("error fetching speed", error);
        res.status(400)
    }
})

app.get('/urls', async (req, res) => {
    const { inctag, disctag } = req.body
    try {
        res.json(await getjson())
    } catch (error) {
        console.log("cant get data from db", error);
        res.status(400)
    }
});



// const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

